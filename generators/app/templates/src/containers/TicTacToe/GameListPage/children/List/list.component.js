import React, { useState, useEffect, useCallback } from 'react';
import { useLiveUpdate, NotificationTypes, shexUtil } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import ldflex from '@solid/query-ldflex';
import { namedNode } from '@rdfjs/data-model';
import { Loader, Select } from '@util-components';
import tictactoeShape from '@contexts/tictactoe-shape.json';
import {
  ldflexHelper,
  errorToaster,
  storageHelper,
  notification as helperNotification
} from '@utils';
import { GameStatusList, GameStatus, KnownInboxes } from '@constants';
import { LDP } from '@vocabs';
import { Wrapper, ListWrapper, GameListContainers, GameListHeader } from './list.style';
import GameItem from './children';

let oldTimestamp;
let appPath;

type Props = { webId: String, gamePath: String, sendNotification: Function };
type GameListProps = { title: String, games: Array, webId: String, deleteGame: Function };

/**
 * Loads, filters, and displays the list of available games for the current user
 *
 * @param {String} title - Title of the list to display
 * @param {Array} games - A list of all of the games available to the user
 * @param {String} webId - WebID URL of the current user
 * @param {Function} deleteGame - A reference to the delete game function
 */
const GameList = ({ title, games, webId, deleteGame }: GameListProps) => {
  const { t } = useTranslation();
  const [filteredGames, setFilteredGames] = useState(games);
  const [selectedFilter, setSelectedFilter] = useState('All');

  /**
   * Set the visible game list depending on what filter the user has selected
   * @param event
   */
  const filterGameList = event => {
    const filter = event.target.value;
    if (filter === GameStatus.ALL) {
      setFilteredGames(games);
    } else {
      const filteredList = games.filter(game => game.status === filter);
      setFilteredGames(filteredList);
    }
    setSelectedFilter(filter);
  };

  return (
    <div>
      <GameListHeader>
        <h2>{title}</h2>
        <div className="input-wrap">
          <label htmlFor="selected-filter">
            {t('game.status')}
            <Select
              name="selected-filter"
              id="selected-filter"
              options={GameStatusList}
              defaultValue={selectedFilter}
              onChange={filterGameList}
            />
          </label>
        </div>
      </GameListHeader>
      {filteredGames.length > 0 ? (
        <ListWrapper className="ids-container__four-column grid">
          {filteredGames.map(game => (
            <GameItem {...{ game }} key={game.url} webId={webId} deleteGame={deleteGame} />
          ))}
        </ListWrapper>
      ) : (
        <span>{t('game.nogames')}</span>
      )}
    </div>
  );
};

const List = ({ webId, gamePath, sendNotification }: Props) => {
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

  /**
   * Deletes a game from a contains predicate in a specific url
   * @param {String} gameUrl Game to delete
   * @param {String} documentUrl URL of the document with a contains predicate
   */
  const deleteGameFromContains = async (gameUrl, documentUrl) => {
    await ldflex[documentUrl]['schema:hasPart'].delete(namedNode(gameUrl));
  };

  /**
   * Deletes a game as invitee, sets the game status to Resigned and sends a notification to the owner
   * @param {Object} game Game to be deleted
   */
  const resignedGame = async ({ url, documentUrl, status, actor }) => {
    if (status !== GameStatus.FINISHED) {
      const statusPredicate = 'http://data.totl.net/game/status';
      const licenseUrl = 'https://creativecommons.org/licenses/by-sa/4.0/';
      // Change status to resigned
      await ldflex[url][statusPredicate].replace(status, GameStatus.RESIGNED);

      if (!appPath) {
        appPath = await storageHelper.getAppStorage(actor.webId);
      }

      // Send notification
      const gameSettings = `${appPath}settings.ttl`;
      const { GLOBAL, GAME } = KnownInboxes;

      const inboxes = await helperNotification.findUserInboxes([
        { path: actor.webId, name: GLOBAL },
        { path: gameSettings, name: GAME }
      ]);

      const to = helperNotification.getDefaultInbox(inboxes, GAME, GLOBAL);

      await sendNotification(
        {
          title: 'Tictactoe resignation',
          summary: 'has resigned a game of TicTacToe',
          actor: webId,
          object: url
        },
        to.path,
        NotificationTypes.LEAVE,
        licenseUrl
      );
    }
    // Delete game from contains
    await deleteGameFromContains(url, documentUrl);
  };

  /**
   * Deletes a game based on it's url. Checks for a deleted flag
   * to check if it needs to be deleted from a contains predicate
   * @param {Object} game Game to be deleted
   */
  const deleteGame = async game => {
    const { url, deleted, documentUrl, opponent } = game;
    if (deleted) {
      await deleteGameFromContains(url, documentUrl);
    } else if (opponent.webId === webId) await resignedGame(game);
    else await ldflexHelper.deleteFile(url);

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
      const nameValue = name && name.value.trim().length > 0 ? name.value : webId.toString();
      const imageUrl = await ldflex[webId]['vcard:hasPhoto'];
      const image = imageUrl ? imageUrl.value : 'img/people.svg';
      return { name: nameValue, image, webId };
    } catch (e) {
      return { name: webId, image: 'img/people.svg', webId };
    }
  });

  /**
   * Fetches all games from a url
   * @param {String} url URL for the container to get the games from
   */
  const getGames = useCallback(
    async url => {
      try {
        let gameItemPredicate;
        const document = await ldflexHelper.fetchLdflexDocument(url);
        let gameList = [];
        if (!document) return gameList;

        const type = await document['rdf:type'];
        const typeValue = type ? type.value : undefined;

        /**
         * If the document is a container, then we want to loop over the ldp:contains property of the container
         * If it is not a container, we are using schema:hasPart so we don't confuse it with a container
         * schema:hasPart is used for externally linked games in other people's pods
         */
        if (typeValue === LDP.BASICCONTAINER) {
          gameItemPredicate = 'ldp:contains';
        } else {
          gameItemPredicate = 'schema:hasPart';
        }

        // Collect the items into an array so we can validate the list of IRIs
        const gameUrls = [];
        for await (const item of document[gameItemPredicate]) {
          const { value } = item;
          gameUrls.push(value);
        }

        if (gameUrls.length === 0) {
          return gameUrls;
        }

        // Run the list of games fetched from the document through the shex validator helper function and store the valid items in gameList
        const gameShapeUrl = 'https://solidsdk.inrupt.net/sdk/tictactoe.shex';
        gameList = await shexUtil.validateList(gameUrls, gameShapeUrl);

        let games = [];

        // Looping over all valid game data
        for await (const game of gameList) {
          let gameData = {};

          // Looping over each predicate in the game shape
          for (const field of tictactoeShape.shape) {
            const predicate = getPredicate(field);

            // Find the quad that matches this field, and get the value
            const fieldQuad = game.find(obj => obj.predicate.value === predicate);
            const fieldValue = fieldQuad.object.value;

            gameData = {
              ...gameData,
              url: fieldQuad.subject.value,
              [field.predicate]: fieldValue,
              deleted: false,
              documentUrl: url
            };
          }

          // Only the IRI of the opponent and player are stored in the shape
          // This fetches the name and image, and stores it as an object
          const opponent = await getPlayerInfo(gameData.opponent);
          const actor = await getPlayerInfo(gameData.actor);

          gameData = { ...gameData, actor, opponent };

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
    appPath = await storageHelper.getAppStorage(webId);

    const inviteGamesUrl = `${appPath}data.ttl`;
    const games = await getGames(gamePath);
    const inviteGames = await getGames(inviteGamesUrl);

    let allGames = [];

    if (Array.isArray(games)) allGames = [...allGames, ...games];

    if (Array.isArray(inviteGames)) allGames = [...allGames, ...inviteGames];
    setList(allGames);
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
