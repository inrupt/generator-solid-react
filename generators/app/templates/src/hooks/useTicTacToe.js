import { useState, useEffect } from 'react';
import { ldflexHelper } from '@utils';
import tictactoeShape from '@contexts/tictactoe-shape.json';
import { namedNode } from '@rdfjs/data-model';
import moment from 'moment';

export const useTicTacToe = (
    webId: String,
    documentUri: String = '',
    opponent: String = ''
) => {
    const [gameData, setGameData] = useState({});

    useEffect(() => {
        if (webId) init();
    }, [webId, documentUri, opponent]);

    const init = async () => {
        //await createGame(documentUri, opponent);
        await getGame(documentUri);
    };

    const initialGame = opponent => {
        return {
            gamestatus: 'Created',
            createddatetime: moment().format(),
            sender: namedNode(webId),
            opponent: namedNode(opponent),
            firstmove: 'X',
            moveorder: '1',
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

    const getToken = () => {
        const { sender, opponent } = gameData;
        return webId === sender ? 'X' : webId === opponent ? 'O' : '?';
    };

    const onMove = index => {
        const { moves } = gameData;
        const newMoves = moves.map((move, i) =>
            move === null && i === index ? getToken() : move
        );
        setGameData({...gameData, moves: newMoves});
    };

    const getPredicate = field => {
        const prefix = tictactoeShape['@context'][field.prefix];
        return `${prefix}${field.predicate}`;
    };

    const getGame = async (documentUri: String) => {
        try {
            const game = await ldflexHelper.fetchLdflexDocument(documentUri);
            let auxData = {};
            for await (let field of tictactoeShape.shape) {
                const value = await game[getPredicate(field)];
                auxData = { ...auxData, [field.predicate]: value.value };
            }
            setGameData({ ...auxData, moves: new Array(9).fill(null) });
        } catch (e) {
            console.error(e);
        }
    };

    return {
        gameData,
        createGame,
        onMove,
    };
};
