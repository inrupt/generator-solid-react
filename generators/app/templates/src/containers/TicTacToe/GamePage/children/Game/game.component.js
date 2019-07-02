import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { useLiveUpdate, useNotification } from '@inrupt/solid-react-components';
import moment from 'moment';
import {
  ldflexHelper,
  errorToaster,
  successToaster,
  buildPathFromWebId,
  notification
} from '@utils';
import tictactoeShape from '@contexts/tictactoe-shape.json';
import Board from '../Board';
import { GameWrapper, Metadata } from './game.style';

type Props = { webId: String, gameURL: String };

const Game = ({ webId, gameURL }: Props) => {
  /** Game Logic */
  const updates = useLiveUpdate();
  const { timestamp } = updates;
  const [gameDocument, setGameDocument] = useState(null);
  const [gameData, setGameData] = useState({});
  const inboxUrl = buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_INBOX);
  const { createNotification } = useNotification(inboxUrl, webId);

  const sendNotification = useCallback(
    async (opponent, content) => {
      try {
        notification.sendNotification(opponent, content, createNotification);
      } catch (error) {
        errorToaster(error.message, 'Error');
      }
    },
    [gameData]
  );

  const getSecondToken = useCallback(token => (token === 'X' ? 'O' : 'X'));

  const getToken = useCallback(data => {
    const { sender, opponent, firstmove } = data;
    if (webId === sender) return firstmove;
    return webId === opponent ? getSecondToken(firstmove) : '?';
  });

  const generateMoves = useCallback((moveorder: Array<String>, firstmove: String) => {
    const array = Array.isArray(moveorder) ? moveorder : [moveorder];
    return array.reduce((allSquares, current, i) => {
      const squares = allSquares;
      let move;
      if (i % 2 === 0) move = firstmove;
      else move = getSecondToken(firstmove);
      squares[current] = move;
      return squares;
    }, new Array(9).fill(null));
  });

  const getPredicate = useCallback(field => {
    const prefix = tictactoeShape['@context'][field.prefix];
    return `${prefix}${field.predicate}`;
  });

  const isMyTurn = useCallback(data => {
    const { gamestatus } = data;
    return gamestatus && gamestatus.split(' ')[1] === getToken(data);
  });

  const canPlay = useCallback(data => {
    const { sender, opponent } = data;
    return (webId === sender || webId === opponent) && isMyTurn(data);
  });

  const nextPlayer = useCallback(data => {
    const { sender, opponent, firstmove } = data;
    return isMyTurn(data) && firstmove === getToken(data) ? sender : opponent;
  });

  const getGame = useCallback(async (gameURL: String) => {
    try {
      const game = await ldflexHelper.fetchLdflexDocument(gameURL);
      setGameDocument(game);
      let auxData = {};
      for await (const field of tictactoeShape.shape) {
        let values = [];
        for await (const val of game[getPredicate(field)]) {
          values = [...values, val.value];
        }
        const value = values.length > 1 ? values : values[0];
        auxData = { ...auxData, [field.predicate]: value };
      }

      const moves = generateMoves(auxData.moveorder, auxData.firstmove);
      setGameData({
        ...auxData,
        moves,
        canPlay: canPlay(auxData),
        nextPlayer: nextPlayer(auxData)
      });
    } catch (e) {
      errorToaster(e.message, 'Error');
    }
  });

  const changeGameStatus = useCallback(async gamestatus => {
    try {
      const predicate = 'http://www.w3.org/2000/01/rdf-schema#gamestatus';
      await gameDocument[predicate].delete();
      await gameDocument[predicate].add(gamestatus);
    } catch (e) {
      throw e;
    }
  });

  const checkWinGame = useCallback(async () => {
    try {
      const { moves } = gameData;
      if (moves) {
        const possibleCombinations = [
          [0, 4, 8],
          [2, 4, 6],
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8]
        ];

        let win = [];

        for (const combination of possibleCombinations) {
          const [first, second, third] = combination;

          if (
            moves[first] !== null &&
            moves[first] === moves[second] &&
            moves[first] === moves[third]
          ) {
            win = combination;
            break;
          }
        }
        if (win.length > 0) {
          setGameData({ ...gameData, win, gamestatus: 'Completed' });
          await changeGameStatus('Completed');
          successToaster('You have won!!! Congrats', 'Winner');
        }
      }
    } catch (e) {
      errorToaster(e.message, 'Error');
    }
  });

  const addMove = useCallback(async index => {
    try {
      const predicate = 'http://www.w3.org/2000/01/rdf-schema#moveorder';
      await gameDocument[predicate].add(`${index}`);
    } catch (e) {
      throw e;
    }
  });

  const onMove = useCallback(async index => {
    try {
      const { moves, opponent, target } = gameData;
      if (moves[index] === null) {
        const newMoves = moves.map((move, i) =>
          move === null && i === index ? getToken(gameData) : move
        );
        const gamestatus = `Move ${getSecondToken(getToken(gameData))}`;
        const newData = { ...gameData, moves: newMoves, gamestatus };
        setGameData({ ...newData, canPlay: canPlay(newData) });
        await changeGameStatus(gamestatus);
        await addMove(index);
        await sendNotification(opponent, {
          title: 'Tictactoe move',
          summary: 'Made a move',
          sender: webId,
          object: gameURL,
          target
        });
      }
    } catch (e) {
      errorToaster(e.message, 'Error');
    }
  });

  useEffect(() => {
    getGame(gameURL);
  }, [gameURL, timestamp]);

  useEffect(() => {
    checkWinGame();
  }, [gameData]);

  return (
    <GameWrapper>
      {gameData && (
        <Fragment>
          <Metadata>
            <span>
              Next player: <b>{gameData.nextPlayer}</b>
            </span>
            {!canPlay && <span>Not your turn, please wait for your opponent to play </span>}
            <span>
              Game Status: <b>{gameData.gamestatus}</b>
            </span>
          </Metadata>
          {gameData.moves && (
            <Board
              {...{
                squares: gameData.moves,
                onMove,
                canPlay: gameData.canPlay
              }}
            />
          )}
          {gameData && (
            <Metadata>
              <span>
                Created: <b>{moment(gameData.createddatetime).format('MMM Do, YYYY')}</b>
              </span>
              {gameData.win && (
                <span>
                  Winner Combination: <b>{gameData.win.join('-')}</b>
                </span>
              )}
            </Metadata>
          )}
        </Fragment>
      )}
    </GameWrapper>
  );
};

export default Game;
