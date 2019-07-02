import React, { useState, useEffect } from 'react';
import { useLiveUpdate } from '@inrupt/solid-react-components';
import { Loader } from '@util-components';
import tictactoeShape from '@contexts/tictactoe-shape.json';
import { buildPathFromWebId, ldflexHelper } from '@utils';
import GameItem from './children';
import { Wrapper, ListWrapper } from './list.style';

type Props = { webId: String };

const List = ({ webId }: Props) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const updates = useLiveUpdate();
  const { timestamp } = updates;

  const getPredicate = field => {
    const prefix = tictactoeShape['@context'][field.prefix];
    return `${prefix}${field.predicate}`;
  };

  const getGames = async () => {
    const url = buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_PATH);
    const document = await ldflexHelper.fetchLdflexDocument(url);
    let gameList = [];
    for await (const item of document['ldp:contains']) {
      const { value } = item;
      if (value.includes('.ttl')) gameList = [...gameList, value];
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

      games = [...games, gameData];
    }

    setList(games);
  };

  const init = async () => {
    setIsLoading(true);
    await getGames();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (timestamp) getGames();
  }, [timestamp]);
  return (
    <Wrapper>
      {!isLoading ? (
        <div>
          <h2>Your games:</h2>
          {list.length > 0 ? (
            <ListWrapper>
              {list.map(game => (
                <GameItem {...{ game }} key={game.url} />
              ))}
            </ListWrapper>
          ) : (
            <span>No games found</span>
          )}
        </div>
      ) : (
        <Loader absolute />
      )}
    </Wrapper>
  );
};

export default List;
