import { useState, useEffect } from 'react';
import { namedNode } from '@rdfjs/data-model';
import { ldflexHelper } from '@utils';
import tictactoeShape from '@contexts/tictactoe-shape.json';
import moment from 'moment';

export const useTicTacToe = (webId: String, documentUri: String = '') => {
    const [gameData, setGameData] = useState({});
    const [gameDocument, setGameDocument] = useState(null);

    useEffect(() => {
        if (webId) init();
    }, [webId, documentUri]);

    const init = async () => {
        await getGame(documentUri);
    };

    useEffect(() => {
        if (!gameData.win) checkWinGame();
    }, [gameData]);

    const initialGame = opponent => {
        return {
            gamestatus: 'Created',
            createddatetime: moment().format(),
            sender: namedNode(webId),
            opponent: namedNode(opponent),
            firstmove: 'X',
            moveorder: '',
        };
    };

    const createGame = async (documentUri: String, opponent: String) => {
        try {
            await ldflexHelper.createNonExistentDocument(documentUri);
            const document = await ldflexHelper.fetchLdflexDocument(
                documentUri
            );
            const setupObj = initialGame(opponent);
            for await (let field of tictactoeShape.shape) {
                const prefix = tictactoeShape['@context'][field.prefix];
                const predicate = `${prefix}${field.predicate}`;
                await document[predicate].add(setupObj[field.predicate]);
            }
        } catch (e) {
            throw e;
        }
    };

    const isMyTurn = () => {
        return true;
    };

    const canPlay = data => {
        const { sender, opponent } = data;
        return (webId === sender || webId === opponent) && isMyTurn();
    };

    const getToken = () => {
        const { sender, opponent } = gameData;
        return webId === sender ? 'X' : webId === opponent ? 'O' : '?';
    };

    const onMove = async index => {
        const { moves } = gameData;
        if (moves[index] === null) {
            const newMoves = moves.map((move, i) =>
                move === null && i === index ? getToken() : move
            );
            const gamestatus = `Move ${getToken()}`;
            const newData = { ...gameData, moves: newMoves, gamestatus };
            setGameData(newData);
            await addMove(index);
            await changeGameStatus(gamestatus);
            console.log(newMoves);
        }
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

                const win = possibleCombinations.reduce(
                    (winnerCombination, combination) => {
                        const [first, second, third] = combination;
                        const equals =
                            moves[first] !== null &&
                            moves[first] === moves[second] &&
                            moves[first] === moves[third];
                        return equals ? combination : winnerCombination;
                    },
                    []
                );
                if (win.length > 0) {
                    setGameData({ ...gameData, win, gamestatus: 'Completed' });
                    await changeGameStatus('Completed');
                    console.log("You've won!!! Congrats");
                }
            }
        } catch (e) {
            throw e;
        }
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
            });
        } catch (e) {
            throw e;
        }
    };

    return {
        gameData,
        createGame,
        onMove,
    };
};
