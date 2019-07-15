import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { useLiveUpdate, useNotification } from '@inrupt/solid-react-components';
import moment from 'moment';
import { ldflexHelper, errorToaster, buildPathFromWebId, notification } from '@utils';
import ldflex from '@solid/query-ldflex';
import { namedNode } from '@rdfjs/data-model';
import tictactoeShape from '@contexts/tictactoe-shape.json';
import Board from '../Board';
import GameAccept from '../GameAccept';
import { GameWrapper, Metadata } from './game.style';

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
type Props = { webId: String, gameURL: String };

const Game = ({ webId, gameURL }: Props) => {
  /** Game Logic */
  const updates = useLiveUpdate();
  const { timestamp } = updates;
  const [gameDocument, setGameDocument] = useState(null);
  const [gameData, setGameData] = useState({});
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const inboxUrl = buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_INBOX);
  const { createNotification, createInbox } = useNotification(webId);
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

  const changeGameStatus = useCallback(
    async gamestatus => {
      try {
        const predicate = 'http://www.w3.org/2000/01/rdf-schema#gamestatus';
        await gameDocument[predicate].set(gamestatus);
      } catch (e) {
        throw e;
      }
    },
    [gameDocument]
  );

  const getPlayerInfo = async webId => {
    try {
      const nameData = await ldflex[webId]['vcard:fn'];
      const imageData = await ldflex[webId]['vcard:hasPhoto'];
      const name = nameData ? nameData.value : webId;
      const image = imageData ? imageData.value : '/img/icon/empty-profile.svg';
      return { name, image, webId };
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
      await changeGameStatus('Move X');
      await addGameToList();
      cb();
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

  const getRival = ({ actor, opponent, owner }) => (owner ? opponent : actor);

  const fetchRawData = async () => {
    const game = await ldflexHelper.fetchLdflexDocument(gameURL);
    setGameDocument(game);
    let data = {};
    for await (const field of tictactoeShape.shape) {
      const fieldData = await game[getPredicate(field)];
      data = { ...data, [field.predicate]: fieldData.value };
    }
    return data;
  };

  const checkForWinnerOrTie = moves => {
    if (!moves) return null;
    const isMovesFull = moves.filter(move => move === null).length === 0;
    let gameResult = {};
    for (const combination of possibleCombinations) {
      const [first, second, third] = combination;
      if (
        moves[first] !== null &&
        moves[first] === moves[second] &&
        moves[first] === moves[third]
      ) {
        gameResult = { win: true, combination, token: moves[first], finished: true };
        break;
      }
    }
    if (!gameResult.win && isMovesFull) gameResult = { win: false, finished: true };
    setResult(gameResult);
    return gameResult;
  };

  const checkWinnerOrNextPlayer = useCallback(
    async data => {
      const { moves } = data;
      const result = await checkForWinnerOrTie(moves);
      const gamestatus = result.finished ? 'Finished' : data.gamestatus;
      await changeGameStatus(gamestatus);
    },
    [gameData]
  );

  const getInitialGame = useCallback(async () => {
    try {
      const gameDocData = await fetchRawData();
      const actor = await getPlayerInfo(gameDocData.actor);
      const opponent = await getPlayerInfo(gameDocData.opponent);
      const owner = webId === actor.webId;
      const rival = getRival({ actor, opponent, owner });
      const token = owner ? gameDocData.firstmove : getSecondToken(gameDocData.firstmove);
      const moveorder = gameDocData.moveorder ? gameDocData.moveorder.split('-') : [];
      const moves = generateMoves(moveorder, gameDocData.firstmove);
      const myTurn = canPlay({
        gamestatus: gameDocData.gamestatus,
        moves,
        token
      });
      const newData = {
        ...gameDocData,
        actor,
        opponent,
        moveorder,
        moves,
        owner,
        rival,
        token,
        canPlay: myTurn
      };
      setRival(rival);
      setGameData(newData);
      if (gameDocData.gamestatus === 'Finished') checkForWinnerOrTie(moves);
    } catch (e) {
      errorToaster(e.message);
    }
  });

  const getGame = useCallback(async () => {
    try {
      const gameDocData = await fetchRawData();
      if (gameDocData.gamestatus === gameData.gamestatus) {
        return;
      }
      const moveorder = gameDocData.moveorder ? gameDocData.moveorder.split('-') : [];
      const { gamestatus } = gameDocData;
      const moves = generateMoves(moveorder, gameDocData.firstmove);
      const myTurn = canPlay({
        gamestatus: gameDocData.gamestatus,
        moves,
        token: gameData.token
      });
      const newData = { ...gameData, moveorder, moves, canPlay: myTurn, gamestatus };
      setGameData(newData);
      if (gamestatus === 'Finished') checkForWinnerOrTie(moves);
    } catch (e) {
      errorToaster(e.message, 'Error');
    }
  }, [gameURL, gameData]);

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

  const onMove = useCallback(
    async index => {
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
          await checkWinnerOrNextPlayer(newData);
          await sendNotification(rival.webId, {
            title: 'Tictactoe move',
            summary: 'A move has been made in your Tic-Tac-Toe game.',
            actor: webId,
            object: gameURL,
            target: window.location.href
          });
          setIsProcessing(false);
        }
      } catch (e) {
        setIsProcessing(false);
        errorToaster(e.message, 'Error');
      }
    },
    [gameData]
  );

  useEffect(() => {
    const gamePath = buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_PATH);
    if (gameURL) {
      createInbox(`${gamePath}inbox/`, gamePath);
      getInitialGame();
    }
  }, []);

  useEffect(() => {
    if ((gameURL || timestamp) && !isProcessing && gameData.actor) getGame();
  }, [gameURL, timestamp]);

  return (
    <GameWrapper>
      {Object.keys(gameData).length > 0 && (
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

            {!result && !gameData.canPlay && (
              <span>Not your turn, please wait for your opponent to play </span>
            )}
            {result && result.finished && (
              <div>
                {result.win &&
                  (result.token === gameData.token ? (
                    <span>You are the winner!!</span>
                  ) : (
                    <span>Better luck next time!!</span>
                  ))}
                {!result.win && <span>It's a tie!!</span>}
              </div>
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
                result
              }}
            />
          )}
          {gameData && (
            <Metadata>
              <span>
                Created: <b>{moment(gameData.createddatetime).format('MMM Do, YYYY')}</b>
              </span>
              {result && result.win && (
                <Fragment>
                  <span>
                    Winner: <strong>{result.token}</strong> with{' '}
                    <b>{result.combination.join('-')}</b>
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
