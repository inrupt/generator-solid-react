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
import ldflex from '@solid/query-ldflex';
import tictactoeShape from '@contexts/tictactoe-shape.json';
import Board from '../Board';
import GameAccept from '../GameAccept';
import { GameWrapper, Metadata } from './game.style';

type Props = { webId: String, gameURL: String };

const Game = ({ webId, gameURL }: Props) => {
  /** Game Logic */
  const updates = useLiveUpdate();
  const { timestamp } = updates;
  const [gameDocument, setGameDocument] = useState(null);
  const [gameData, setGameData] = useState({});
  const [winner, setWinner] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const inboxUrl = buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_INBOX);
  const { createNotification } = useNotification(webId);
  const [opponentPlayer, setOpponentPlayer] = useState(null);

  const sendNotification = useCallback(
    async (player, content) => {
      try {
        notification.sendNotification(player, content, createNotification);
      } catch (error) {
        errorToaster(error.message, 'Error');
      }
    },
    [gameData, inboxUrl]
  );

  const getSecondToken = useCallback(token => (token === 'X' ? 'O' : 'X'));

  const getToken = useCallback(data => {
    const { sender, opponent, firstmove } = data;
    if (webId === sender) return firstmove;
    return webId === opponent ? getSecondToken(firstmove) : '?';
  });

  const getPlayer = token => {
    const { firstmove, sender, opponent } = gameData;
    return token === firstmove ? sender : opponent;
  };

  const generateMoves = useCallback((moveorder: Array<String>, firstmove: String) =>
    moveorder.reduce((allSquares, current, i) => {
      const squares = allSquares;
      let move;
      if (i % 2 === 0) move = firstmove;
      else move = getSecondToken(firstmove);
      squares[current] = move;
      return squares;
    }, new Array(9).fill(null))
  );

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

  const changeGameStatus = useCallback(async gamestatus => {
    try {
      const predicate = 'http://www.w3.org/2000/01/rdf-schema#gamestatus';
      const data = await gameDocument[predicate];
      await gameDocument[predicate].replace(data.value, gamestatus);
    } catch (e) {
      throw e;
    }
  });

  const checkWinner = useCallback(async () => {
    try {
      const { moves, gamestatus } = gameData;
      if (!moves) return;
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

      let winnerObject = {};
      for (const combination of possibleCombinations) {
        const [first, second, third] = combination;
        if (
          moves[first] !== null &&
          moves[first] === moves[second] &&
          moves[first] === moves[third]
        ) {
          winnerObject = { combination, token: moves[first] };
          break;
        }
      }
      if (winnerObject.token) {
        if (gamestatus !== 'Finished') {
          await changeGameStatus('Finished');
          if (getPlayer(winnerObject.token) === webId)
            successToaster('You have won!!! Congrats', 'Winner');
          else successToaster('Better luck next time!!');
        }
        setWinner(winnerObject);
      }
    } catch (e) {
      errorToaster(e.message, 'Error');
    }
  });

  const getPlayerInfo = async webId => {
    try {
      const name = await ldflex[webId]['vcard:fn'];
      const image = await ldflex[webId]['vcard:hasPhoto'];
      return { name: name.value, image: image.value, webId };
    } catch (e) {
      throw e;
    }
  };

  const getGame = useCallback(async (gameURL: String) => {
    try {
      const game = await ldflexHelper.fetchLdflexDocument(gameURL);
      setGameDocument(game);
      let auxData = {};
      for await (const field of tictactoeShape.shape) {
        const fieldData = await game[getPredicate(field)];
        auxData = { ...auxData, [field.predicate]: fieldData.value };
      }
      const moveorder = auxData.moveorder ? auxData.moveorder.split('-') : [];
      auxData = { ...auxData, moveorder };
      const moves = generateMoves(auxData.moveorder, auxData.firstmove);
      const playingAgainst = nextPlayer(auxData);
      const opponent = await getPlayerInfo(auxData.opponent);
      const sender = await getPlayerInfo(auxData.sender);
      const opponentPlayer = playingAgainst === auxData.opponent ? opponent : sender;
      const amISender = auxData.sender === webId;

      setOpponentPlayer(opponentPlayer);
      setGameData({
        ...auxData,
        moves,
        canPlay: canPlay(auxData),
        opponent,
        sender,
        amISender
      });
    } catch (e) {
      errorToaster(e.message, 'Error');
    }
  });

  const addMoves = useCallback(async array => {
    try {
      const moves = array.join('-');
      const predicate = 'http://www.w3.org/2000/01/rdf-schema#moveorder';
      await gameDocument[predicate].delete();
      await gameDocument[predicate].add(moves);
    } catch (e) {
      throw e;
    }
  });

  const onMove = useCallback(async index => {
    try {
      setIsProcessing(true);
      const { moves, opponent, sender, moveorder } = gameData;
      if (moves[index] === null) {
        const newMoves = moves.map((move, i) =>
          move === null && i === index ? getToken(gameData) : move
        );
        const newOrder = [...moveorder, index];
        const gamestatus = `Move ${getSecondToken(getToken(gameData))}`;
        const newData = { ...gameData, moves: newMoves, gamestatus };
        setGameData({ ...newData, canPlay: canPlay(newData) });
        await addMoves(newOrder);
        await changeGameStatus(gamestatus);
        const otherPlayer = webId === sender ? opponent : sender;
        const target = window.location.href;
        await sendNotification(otherPlayer, {
          title: 'Tictactoe move',
          summary: 'A move has been made in your Tic-Tac-Toe game.',
          sender: webId,
          object: gameURL,
          target
        });
        setIsProcessing(false);
      }
    } catch (e) {
      setIsProcessing(false);
      errorToaster(e.message, 'Error');
    }
  });

  useEffect(() => {
    if ((gameURL || timestamp) && !isProcessing) getGame(gameURL);
  }, [gameURL, timestamp]);

  useEffect(() => {
    if (gameData && Object.keys(gameData).length > 0) checkWinner();
  }, [gameData]);

  return (
    <GameWrapper>
      {gameData && (
        <Fragment>
          {!gameData.amISender && gameData.gamestatus === 'awaiting' && (
            <GameAccept {...{ ...gameData }} />
          )}
          <Metadata>
            {
              <div>
                Playing against:
                {opponentPlayer && (
                  <a href={opponentPlayer.webId}>
                    <strong>{opponentPlayer.name}</strong>
                  </a>
                )}
              </div>
            }

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
                canPlay: gameData.canPlay,
                winner
              }}
            />
          )}
          {gameData && (
            <Metadata>
              <span>
                Created: <b>{moment(gameData.createddatetime).format('MMM Do, YYYY')}</b>
              </span>
              {winner && (
                <Fragment>
                  <span>
                    Winner: <strong>{winner.token}</strong> with{' '}
                    <b>{winner.combination.join('-')}</b>
                  </span>
                </Fragment>
              )}
            </Metadata>
          )}
        </Fragment>
      )}
    </GameWrapper>
  );
};

export default Game;
