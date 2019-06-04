import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { namedNode } from '@rdfjs/data-model';
import N3 from 'n3';
import tictactoeShape from '@contexts/tictactoe-shape.json';
import { ldflexHelper } from '@utils';

const GameFormWrapper = styled.div`
    padding: 16px;
    margin-bottom: 12px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    text-align: left;
    & > h1 {
        margin: 0;
    }
    & > form {
        & > span {
            font-weight: 700;
        }
        padding: 12px 0;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }
`;

const BtnDiv = styled.div`
    display: flex;
    & > button {
        margin: 0 12px 0 0;
    }
`;

const GameForm = ({ onCreateGame, webId }) => {
    console.log('WebId', webId);
    const pod = webId.split('/profile')[0];
    const uniqueIdentifier = Date.now();
    const [documentUri, setDocumentUri] = useState(
        `${pod}/public/tictactoe/${uniqueIdentifier}.ttl`
    );
    const [opponent, setOpponent] = useState(
        'https://jprod.solid.community/profile/card#me'
    );

    const onSubmit = async e => {
        try {
            e.preventDefault();
            await createGame(documentUri, opponent);
            await aclTurtle(documentUri, opponent);
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
            firstmove: 'X',
        };
    };

    const createQuad = (subject, predicate, object) => ({
        subject,
        predicate,
        object,
    });

    const createDefaultQuads = (modes, webId, subject, prefixes) => {
        const { acl, foaf, a } = prefixes;
        const originalPredicates = [
            createQuad(subject, `${a}`, namedNode(`${acl}Authorization`)),
            createQuad(subject, `${acl}accessTo`, namedNode(documentUri))
            
        ];
        const predicates = webId
            ? [
                  ...originalPredicates,
                  createQuad(subject, `${acl}agent`, namedNode(webId)),
              ]
            : [...originalPredicates, createQuad(subject, `${acl}agentClass`, namedNode(`${foaf}Agent`))];

        const quadArray = modes.reduce(
            (array, mode) => [
                ...array,
                createQuad(subject, `${acl}mode`, namedNode(`${acl}${mode}`)),
            ],
            predicates
        );

        return quadArray;
    };

    const aclTurtle = async (documentUri, opponent) => {
        const aclDocument = `${documentUri}.acl`;
        const { DataFactory } = N3;
        const { namedNode, quad } = DataFactory;
        const prefixes = {
            acl: 'http://www.w3.org/ns/auth/acl#',
            foaf: 'http://xmlns.com/foaf/0.1/',
            n: 'http://www.w3.org/2006/vcard/ns#',
            '': `${aclDocument}#`,
            a: 'http://www.w3.org/ns/auth/acl#type',
        };
        const owner = `${aclDocument}#owner`;
        const publicSubject = `${aclDocument}#public`;
        const opponentSubject = `${aclDocument}#opponent`;

        const writer = new N3.Writer({ prefixes });
        const ownerQuads = createDefaultQuads(
            ['Control', 'Read', 'Write'],
            webId,
            owner,
            prefixes
        );

        const opponentQuads = createDefaultQuads(
            ['Read', 'Write'],
            opponent,
            opponentSubject,
            prefixes
        );

        const publicQuads = createDefaultQuads(
            ['Read'],
            null,
            publicSubject,
            prefixes
        );

        const quads = [...ownerQuads, ...opponentQuads, ...publicQuads];
        const testQuads = quads.map(quadItem => {
            const { subject, predicate, object } = quadItem;
            return quad(namedNode(subject), namedNode(predicate), object);
        });
        console.log('Test quads', testQuads);
        testQuads.forEach(quad => writer.addQuad(quad));
        writer.end(async (error, result) => {
            if (!error) {
                console.log(result);
                await createACLFile(aclDocument, result);
            }
        });
    };

    const createACLFile = async (documentUri, body) => {
        try {
            console.log('Creating ACL');
            ldflexHelper.createDocumentWithTurtle(documentUri, body);
            console.log('ACL created');
        } catch (e) {
            console.error('Error while creating ACL');
            throw e;
        }
    };
    const createGame = async (documentUri: String, opponent: String) => {
        try {
            console.log('Creating game');
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
                    if (field.predicate !== 'moveorder')
                        await document[predicate].add(
                            setupObj[field.predicate]
                        );
                }
            }
            console.log('Game Created');
        } catch (e) {
            console.error('Error while creating game');
            throw e;
        }
    };
    return (
        <GameFormWrapper onSubmit={onSubmit}>
            <h1>Tic Tac Toe</h1>
            <hr />
            <form>
                <span>Enter an Opponent and POD Game Path</span>
                <div className="input-wrap">
                    <label htmlFor="documentUri">Document URI</label>
                    <input
                        name="documentUri"
                        type="text"
                        value={documentUri}
                        onChange={e => setDocumentUri(e.target.value)}
                    />
                </div>
                <div className="input-wrap">
                    <label htmlFor="opponentWebId">Opponent WebId</label>
                    <input
                        name="opponentWebId"
                        type="text"
                        value={opponent}
                        onChange={e => setOpponent(e.target.value)}
                    />
                </div>
                <BtnDiv>
                    <button type="submit">Create Game</button>
                    <button type="reset">Reset</button>
                </BtnDiv>
            </form>
        </GameFormWrapper>
    );
};

export default GameForm;
