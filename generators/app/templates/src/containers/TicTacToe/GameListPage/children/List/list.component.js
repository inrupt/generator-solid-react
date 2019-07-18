import React, { useState, useEffect, useCallback } from 'react';
import { useLiveUpdate } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import ldflex from '@solid/query-ldflex';
import { Loader } from '@util-components';
import tictactoeShape from '@contexts/tictactoe-shape.json';
import { ldflexHelper, errorToaster, buildPathFromWebId, getUserNameByUrl } from '@utils';
import GameItem from './children';
import { Wrapper, ListWrapper, GameListContainers } from './list.style';

let oldTimestamp;
type Props = { webId: String, gamePath: String };
type GameListProps = { title: String, games: Array };
const GameList = ({ title, games }: GameListProps) => (
  <div>
    <h2>{title}</h2>
    {games.length > 0 ? (
      <ListWrapper>
        {games.map(game => (
          <GameItem {...{ game }} key={game.url} />
        ))}
      </ListWrapper>
    ) : (
      <span>No games found</span>
    )}
  </div>
);

const List = ({ webId, gamePath }: Props) => {
  const [list, setList] = useState([]);
  const [otherList, setOtherList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const updates = useLiveUpdate();
  const { timestamp } = updates;

  const getPredicate = field => {
    const prefix = tictactoeShape['@context'][field.prefix];
    return `${prefix}${field.predicate}`;
  };

  const getOpponentInfo = useCallback(async webId => {
    try {
      const name = await ldflex[webId]['foaf:name'];
      const image = await ldflex[webId]['vcard:hasPhoto'];
      return { name: name.value, image: image.value, webId };
    } catch (e) {
      const url = new URL(webId);
      return { name: getUserNameByUrl(url), image: 'img/people.svg', webId };
    }
  });

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
          for await (const field of tictactoeShape.shape) {
            let values = [];
            for await (const val of game[getPredicate(field)]) {
              values = [...values, val.value];
            }
            const value = values.length > 1 ? values : values[0];
            gameData = { ...gameData, [field.predicate]: value };
          }
          const opponent = await getOpponentInfo(gameData.opponent);
          gameData = { ...gameData, opponent };
          games = [...games, gameData];
        }
        return games;
      } catch (e) {
        errorToaster(e.message, 'Error');
      }
    },
    [gamePath]
  );

  const init = useCallback(async () => {
    setIsLoading(true);
    const url = buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_PATH);
    const otherGamesUrl = `${url}data.ttl`;
    /**
     * Check if user pod has data.ttl file where will live
     * opponent games if not show error message
     */
    const hasData = await ldflexHelper.existFolder(otherGamesUrl);

    if (!hasData)
      errorToaster(t('game.dataError'), 'Error', {
        label: 'Learn More',
        href: 'https://solidsdk.inrupt.net/public/React/'
      });

    const games = await getGames(gamePath);
    const otherGames = await getGames(otherGamesUrl);
    setList(games);
    setOtherList(otherGames);
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
    <Wrapper>
      {!isLoading ? (
        <GameListContainers>
          {list && <GameList title="Your games" games={list} />}
          {otherList && <GameList title="Other games" games={otherList} />}
        </GameListContainers>
      ) : (
        <Loader absolute />
      )}
    </Wrapper>
  );
};

export default List;
