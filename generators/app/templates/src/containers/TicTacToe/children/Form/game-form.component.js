import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { namedNode } from '@rdfjs/data-model';
import { useWebId } from '@inrupt/solid-react-components';
import tictactoeShape from '@contexts/tictactoe-shape.json';
import { ldflexHelper } from '@utils';

const GameFormWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 12px;
    margin-bottom: 12px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    & > form,
    & div {
        display: flex;
        justify-content: space-between;
        flex: 1 0 auto;
    }
`;

const GameForm = ({ onCreateGame }) => {
    const webId = useWebId();
    const [documentUri, setDocumentUri] = useState(
        'https://jpablo.solid.community/public/tictactoe/27052019434.ttl'
    );
    const [opponent, setOpponent] = useState(
        'https://jprod.solid.community/profile/card#me'
    );

    const onSubmit = async e => {
        try {
            e.preventDefault();
            await createGame(documentUri, opponent);
            onCreateGame(documentUri, opponent);
        } catch (e) {
            console.error(e);
        }
    };

    const initialGame = opponent => {
        return {
            gamestatus: 'Created',
            createddatetime: moment().format(),
            updateddatetime: moment().format(),
            sender: namedNode(webId),
            opponent: namedNode(opponent),
            firstmove: 'X'
        };
    };

    const createGame = async (documentUri: String, opponent: String) => {
        try {
            const newDocument = await ldflexHelper.createNonExistentDocument(
                documentUri
            );
            if (newDocument) {
                const document = await ldflexHelper.fetchLdflexDocument(
                    documentUri
                );
                const setupObj = initialGame(opponent);
                for await (let field of tictactoeShape.shape) {
                    const prefix = tictactoeShape['@context'][field.prefix];
                    const predicate = `${prefix}${field.predicate}`;
                    if(field.predicate !== 'moveorder')
                    await document[predicate].add(setupObj[field.predicate]);
                }
            }
        } catch (e) {
            throw e;
        }
    };
    return (
        <GameFormWrapper onSubmit={onSubmit}>
            <form>
                <div>
                    <label>Document URI</label>
                    <input
                        value={documentUri}
                        onChange={e => setDocumentUri(e.target.value)}
                    />
                </div>
                <div>
                    <label>Opponent WebId</label>
                    <input
                        value={opponent}
                        onChange={e => setOpponent(e.target.value)}
                    />
                </div>
                <button type="submit">Create Game</button>
            </form>
        </GameFormWrapper>
    );
};

export default GameForm;
