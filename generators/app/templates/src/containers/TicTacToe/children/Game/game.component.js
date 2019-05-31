import React, { Fragment, useEffect, useState } from 'react';
import { useLiveUpdate } from '@inrupt/solid-react-components';
import { withToastManager } from 'react-toast-notifications';
import styled from 'styled-components';
import { ldflexHelper } from '@utils';
import moment from 'moment';
import Board from '../Board';
import tictactoeShape from '@contexts/tictactoe-shape.json';

const GameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-items: flex-start;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    flex: 1 0 auto;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
`;

const Metadata = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 4px 16px 12px 16px;
`;

const Turn = ({ player }) => {
    return (
        <span>
            Next player: <b>{player}</b>
        </span>
    );
};

const Game = ({ webId, documentUri, opponent, toastManager }) => {
    /** Game Logic */
    const updates = useLiveUpdate();
    const { timestamp } = updates;
    const [gameDocument, setGameDocument] = useState(null);
    const [gameData, setGameData] = useState({});

    useEffect(() => {
        getGame(documentUri);
    }, [documentUri, timestamp]);

    useEffect(() => {
        checkWinGame();
    }, [gameData]);

    const getGame = async (documentUri: String) => {
        try {
            const game = await ldflexHelper.fetchLdflexDocument(documentUri);
            setGameDocument(game);
            let auxData = {};
            for await (let field of tictactoeShape.shape) {
                let values = [];
                for await (let val of game[getPredicate(field)]) {
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
                nextPlayer: nextPlayer(auxData),
            });
        } catch (e) {
            console.log(e);
        }
    };

    const whoAmI = data => {
        const { sender, opponent } = data;
        return webId === sender ? 'sender' : webId === opponent ? 'opponent' : null;
    };

    const nextPlayer = data => {
        const { sender, opponent, firstmove, gamestatus } = data;
        return isMyTurn(data) && firstmove === getToken(data) ? sender : opponent
    };

    const onMove = async index => {
        try {
            const { moves } = gameData;
            if (moves[index] === null) {
                const newMoves = moves.map((move, i) =>
                    move === null && i === index ? getToken(gameData) : move
                );
                const gamestatus = `Move ${getSecondToken(getToken(gameData))}`;
                const newData = { ...gameData, moves: newMoves, gamestatus };
                setGameData({ ...newData, canPlay: canPlay(newData) });
                await changeGameStatus(gamestatus);
                await addMove(index);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const isMyTurn = data => {
        const { gamestatus } = data;
        return gamestatus && gamestatus.split(' ')[1] === getToken(data);
    };

    const canPlay = data => {
        const { sender, opponent } = data;
        return (webId === sender || webId === opponent) && isMyTurn(data);
    };

    const getPredicate = field => {
        const prefix = tictactoeShape['@context'][field.prefix];
        return `${prefix}${field.predicate}`;
    };

    const addMove = async index => {
        try {
            const predicate = 'http://www.w3.org/2000/01/rdf-schema#moveorder';
            await gameDocument[predicate].add(`${index}`);
        } catch (e) {
            throw e;
        }
    };

    const changeGameStatus = async gamestatus => {
        try {
            const predicate = 'http://www.w3.org/2000/01/rdf-schema#gamestatus';
            await gameDocument[predicate].delete();
            await gameDocument[predicate].add(gamestatus);
        } catch (e) {
            throw e;
        }
    };

    const checkWinGame = async () => {
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
                    [2, 5, 8],
                ];

                let win = [];

                for (let combination of possibleCombinations) {
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
                    console.log("You've won!!! Congrats");
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getToken = data => {
        const { sender, opponent, firstmove } = data;
        return webId === sender
            ? firstmove
            : webId === opponent
            ? getSecondToken(firstmove)
            : '?';
    };

    const getSecondToken = token => {
        return token === 'X' ? 'O' : 'X';
    };

    const generateMoves = (moveorder: Array<String>, firstmove: String) => {
        const array = Array.isArray(moveorder) ? moveorder : [moveorder];
        return array.reduce((allSquares, current, i) => {
            if (i % 2 === 0) allSquares[current] = firstmove;
            else allSquares[current] = getSecondToken(firstmove);
            return allSquares;
        }, new Array(9).fill(null));
    };

    return (
        <GameWrapper>
            {gameData && (
                <Fragment>
                    <Metadata>
                        <Turn player={gameData.nextPlayer} />
                        {!canPlay && (
                            <span>
                                Not your turn, please wait for your opponent to
                                play{' '}
                            </span>
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
                            }}
                        />
                    )}
                    {gameData && (
                        <Metadata>
                            <span>
                                Created:{' '}
                                <b>
                                    {moment(gameData.createddatetime).format(
                                        'MMM Do, YYYY'
                                    )}
                                </b>
                            </span>
                            {gameData.win && (
                                <span>
                                    Winner Combination:{' '}
                                    <b>{gameData.win.join('-')}</b>
                                </span>
                            )}
                        </Metadata>
                    )}
                </Fragment>
            )}
        </GameWrapper>
    );
};

export default withToastManager(Game);
