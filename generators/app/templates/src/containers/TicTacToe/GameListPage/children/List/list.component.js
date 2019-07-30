import React, { useState, useEffect, useCallback } from 'react';
import { useLiveUpdate } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import ldflex from '@solid/query-ldflex';
import { namedNode } from '@rdfjs/data-model';
import { Loader } from '@util-components';
import tictactoeShape from '@contexts/tictactoe-shape.json';
import { ldflexHelper, errorToaster, buildPathFromWebId, getUserNameByUrl } from '@utils';
import GameItem from './children';
import { Wrapper, ListWrapper, GameListContainers } from './list.style';

let oldTimestamp;
type Props = { webId: String, gamePath: String };
type GameListProps = { title: String, games: Array, webId: String, deleteGame: Function };
const GameList = ({ title, games, webId, deleteGame }: GameListProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{title}</h2>
      {games.length > 0 ? (
        <ListWrapper className="ids-container__four-column grid">
          {games.map(game => (
            <GameItem {...{ game }} key={game.url} webId={webId} deleteGame={deleteGame} />
          ))}
        </ListWrapper>
      ) : (
        <span>{t('game.nogames')}</span>
      )}
    </div>
  );
};

const List = ({ webId, gamePath }: Props) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const updates = useLiveUpdate();
  const { timestamp } = updates;

  /**
   * Gets the entire predicate named Node based on a field property from the shape
   * @param {String} field Field to get the predicate for
   * @returns {String} Predicate for a field name
   */
  const getPredicate = field => {
    const prefix = tictactoeShape['@context'][field.prefix];
    return `${prefix}${field.predicate}`;
  };

  const deleteGameFromContains = async (gameUrl, documentUrl) => {
    await ldflex[documentUrl]['ldp:contains'].delete(namedNode(gameUrl));
  };

  const deleteGame = async game => {
    const { url, deleted, documentUrl } = game;
    if (deleted) {
      await deleteGameFromContains(url, documentUrl);
    } else {
      await ldflexHelper.deleteFile(url);
    }
    const newGames = list.filter(gameItem => gameItem.url !== url);
    setList(newGames);
  };

  /**
   * Get basic info for the opponent player (name and image url)
   * @param {String} webId WebId of the player to look the Info for
   * @returns {Object} An object with the basic information of the player
   */
  const getPlayerInfo = useCallback(async webId => {
    try {
      const name = await ldflex[webId]['vcard:fn'];
      const imageUrl = await ldflex[webId]['vcard:hasPhoto'];
      const image = imageUrl ? imageUrl.value : 'img/people.svg';

      return { name: name.value, image, webId };
    } catch (e) {
      const url = new URL(webId);
      return { name: getUserNameByUrl(url), image: 'img/people.svg', webId };
    }
  });

  /**
   * Fetches all games from a url
   * @param {String} url URL for the container to get the games from
   */
  const getGames = useCallback(
    async url => {
      try {
        const document = await ldflexHelper.fetchLdflexDocument(url);
        let gameList = [];
        if (!document) return gameList;
        for await (const item of document['ldp:contains']) {
          const { value } = item;
          if (
            value.includes('.ttl') &&
            !value.includes('data.ttl') &&
            !value.includes('settings.ttl')
          )
            gameList = [...gameList, value];
        }
        let games = [];
        for await (const item of gameList) {
          const game = await ldflexHelper.fetchLdflexDocument(item);
          let gameData = { url: item };
          if (game) {
            for await (const field of tictactoeShape.shape) {
              let values = [];
              for await (const val of game[getPredicate(field)]) {
                values = [...values, val.value];
              }
              const value = values.length > 1 ? values : values[0];
              gameData = { ...gameData, [field.predicate]: value };
            }
            const opponent = await getPlayerInfo(gameData.opponent);
            const actor = await getPlayerInfo(gameData.actor);
            gameData = { ...gameData, opponent, actor, deleted: false, documentUrl: url };
          } else {
            gameData = { ...gameData, gamestatus: 'Deleted', deleted: true, documentUrl: url };
          }
          games = [...games, gameData];
        }
        return games;
      } catch (e) {
        errorToaster(e.message, 'Error');
      }
    },
    [gamePath]
  );

  /**
   * Inits the game by fetching own games and games the player has been invited to
   */
  const init = useCallback(async () => {
    setIsLoading(true);
    const url = buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_PATH);
    const otherGamesUrl = `${url}data.ttl`;
    /**
     * Check if user pod has data.ttl file where will live
     * opponent games if not show error message
     */
    const hasData = await ldflexHelper.folderExists(otherGamesUrl);

    if (!hasData)
      errorToaster(t('game.dataError.message'), 'Error', {
        label: t('game.dataError.link.label'),
        href: t('game.dataError.link.href')
      });

    let games = await getGames(gamePath);
    const otherGames = await getGames(otherGamesUrl);
    games = [...games, ...otherGames];
    setList(games);
    setIsLoading(false);
  });

  useEffect(() => {
    if (gamePath) init();
  }, [gamePath]);

  useEffect(() => {
    const currentTimestamp = timestamp && timestamp.toString();
    if (timestamp && currentTimestamp !== oldTimestamp) {
      init();
      oldTimestamp = currentTimestamp;
    }
  }, [timestamp]);

  return (
    <Wrapper data-testid="game-list">
      {!isLoading ? (
        <GameListContainers>
          {list && (
            <GameList
              title={t('game.yourGames')}
              games={list}
              webId={webId}
              deleteGame={deleteGame}
            />
          )}
        </GameListContainers>
      ) : (
        <Loader absolute />
      )}
    </Wrapper>
  );
};

export default List;
