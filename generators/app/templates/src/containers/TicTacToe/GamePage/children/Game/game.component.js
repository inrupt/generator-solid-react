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
import { namedNode } from '@rdfjs/data-model';
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
  const [rival, setRival] = useState(null);

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

  const canPlay = useCallback(({ gamestatus, token }) => {
    const isStatusValid = gamestatus && gamestatus.includes('Move');
    return isStatusValid ? gamestatus.includes(token) : false;
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
      const isMovesFull = moves.filter(move => move === null).length === 0;

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

      if (isMovesFull && !winnerObject) {
        if (gamestatus !== 'Finished') {
          await changeGameStatus('Finished');
          if (winnerObject.token === gameData.token) successToaster('It is a tie', 'TIE');
          else successToaster('It is a tie', 'TIE');
        }
      }

      if (winnerObject.token) {
        if (gamestatus !== 'Finished') {
          await changeGameStatus('Finished');
          if (winnerObject.token === gameData.token)
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

  const addGameToList = async () => {
    const url = buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_PATH);
    await ldflex[`${url}/data.ttl`]['ldp:contains'].add(namedNode(gameURL));
  };

  const onAccept = async cb => {
    try {
      setIsProcessing(true);
      await changeGameStatus('Move X');
      await addGameToList();
      cb();
      setIsProcessing(false);
    } catch (e) {
      setIsProcessing(false);
      errorToaster(e.message, 'Error');
    }
  };

  const onDecline = async cb => {
    try {
      await changeGameStatus('Declined');
      cb();
    } catch (e) {
      errorToaster(e.message, 'Error');
    }
  };

  const getRival = ({ sender, opponent, owner }) => (owner ? opponent : sender);

  const getGame = useCallback(async (gameURL: String) => {
    try {
      const game = await ldflexHelper.fetchLdflexDocument(gameURL);
      setGameDocument(game);
      let gameDocData = {};
      for await (const field of tictactoeShape.shape) {
        const fieldData = await game[getPredicate(field)];
        gameDocData = { ...gameDocData, [field.predicate]: fieldData.value };
      }
      const sender = await getPlayerInfo(gameDocData.sender);
      const opponent = await getPlayerInfo(gameDocData.opponent);
      const owner = webId === sender.webId;
      const rival = getRival({ sender, opponent, owner });
      const token = owner ? gameDocData.firstmove : getSecondToken(gameDocData.firstmove);
      const moveorder = gameDocData.moveorder ? gameDocData.moveorder.split('-') : [];
      const moves = generateMoves(moveorder, gameDocData.firstmove);
      const myTurn = canPlay({
        gamestatus: gameDocData.gamestatus,
        moves,
        token
      });

      gameDocData = {
        ...gameDocData,
        sender,
        opponent,
        moveorder,
        moves,
        owner,
        rival,
        token,
        canPlay: myTurn
      };
      setRival(rival);
      setGameData(gameDocData);
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
      const { moves, moveorder, token, rival } = gameData;
      if (moves[index] === null) {
        const newMoves = moves;
        newMoves[index] = token;
        const newOrder = [...moveorder, index];
        const gamestatus = `Move ${getSecondToken(token)}`;
        const newData = {
          ...gameData,
          moveorder: newOrder,
          moves: newMoves,
          gamestatus,
          canPlay: canPlay({ gamestatus, lastmove: token, token })
        };
        setGameData(newData);
        await addMoves(newOrder);
        await changeGameStatus(gamestatus);
        await sendNotification(rival.webId, {
          title: 'Tictactoe move',
          summary: 'A move has been made in your Tic-Tac-Toe game.',
          sender: webId,
          object: gameURL,
          target: window.location.href
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
          {!gameData.owner && gameData.gamestatus === 'Awaiting' && (
            <GameAccept {...{ ...gameData, onAccept, onDecline }} />
          )}
          <Metadata>
            {
              <div>
                Playing against:
                {rival && (
                  <a href={rival.webId}>
                    <strong>{rival.name}</strong>
                  </a>
                )}
              </div>
            }

            {!gameData.canPlay && !winner && (
              <span>Not your turn, please wait for your opponent to play </span>
            )}
            {winner && winner.token === gameData.token ? (
              <span>You are the winner</span>
            ) : (
              winner && <span>Better luck next time!!</span>
            )}
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
