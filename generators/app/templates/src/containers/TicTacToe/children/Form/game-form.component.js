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
    & .input-wrap > label {
      width: 100%;
      font-size: 0.9em;
    }
    & > span {
      font-weight: 700;
    }
`;

const BtnDiv = styled.div`
  display: flex;
  & > button {
    margin: 0 12px 0 0;
  }
`;

type Props = { onCreateGame: Function, webId: String };

const GameForm = ({ onCreateGame, webId }: Props) => {
  const pod = webId.split('/profile')[0];
  const uniqueIdentifier = Date.now();
  const [documentUri, setDocumentUri] = useState(`${pod}/public/tictactoe/${uniqueIdentifier}.ttl`);
  const [opponent, setOpponent] = useState('https://jprod.solid.community/profile/card#me');

  const reset = () => {
    setDocumentUri('');
    setOpponent('');
  };

  const initialGame = opponent => ({
    gamestatus: 'Created',
    createddatetime: moment().format(),
    updateddatetime: moment().format(),
    sender: namedNode(webId),
    opponent: namedNode(opponent),
    firstmove: 'X'
  });

  const createGame = async (documentUri: String, opponent: String) => {
    try {
      const newDocument = await ldflexHelper.createNonExistentDocument(documentUri);
      if (newDocument) {
        const document = await ldflexHelper.fetchLdflexDocument(documentUri);
        const setupObj = initialGame(opponent);
        for await (const field of tictactoeShape.shape) {
          const prefix = tictactoeShape['@context'][field.prefix];
          const predicate = `${prefix}${field.predicate}`;
          if (field.predicate !== 'moveorder')
            await document[predicate].add(setupObj[field.predicate]);
        }
      }
    } catch (e) {
      console.error('Error while creating game');
      throw e;
    }
  };

  const createACLFile = async (documentUri, body) => {
    try {
      ldflexHelper.createDocumentWithTurtle(documentUri, body);
    } catch (e) {
      console.error('Error while creating ACL');
      throw e;
    }
  };

  const createQuad = (subject, predicate, object) => ({
    subject,
    predicate,
    object
  });

  const createDefaultQuads = (modes, webId, subject, prefixes) => {
    const { acl, foaf, a } = prefixes;
    const originalPredicates = [
      createQuad(subject, `${a}`, namedNode(`${acl}Authorization`)),
      createQuad(subject, `${acl}accessTo`, namedNode(documentUri))
    ];
    const predicates = webId
      ? [...originalPredicates, createQuad(subject, `${acl}agent`, namedNode(webId))]
      : [...originalPredicates, createQuad(subject, `${acl}agentClass`, namedNode(`${foaf}Agent`))];

    const quadArray = modes.reduce(
      (array, mode) => [...array, createQuad(subject, `${acl}mode`, namedNode(`${acl}${mode}`))],
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
      a: 'http://www.w3.org/ns/auth/acl#type'
    };

    const initialGame = opponent => ({
      gamestatus: 'Created',
      createddatetime: moment().format(),
      updateddatetime: moment().format(),
      sender: namedNode(webId),
      opponent: namedNode(opponent),
      firstmove: 'X'
    });
  };

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

  return (
    <GameFormWrapper onSubmit={onSubmit}>
      <h1>Tic Tac Toe</h1>
      <hr />
      <form>
        <span>Enter an Opponent and POD Game Path</span>
        <div className="input-wrap">
          <label htmlFor="documentUriInput">
            Document URI
            <input
              id="documentUriInput"
              type="text"
              value={documentUri}
              onChange={e => setDocumentUri(e.target.value)}
            />
          </label>
        </div>
        <div className="input-wrap">
          <label htmlFor="opponentWebId">
            Opponent WebId
            <input
              id="opponentWebId"
              type="text"
              value={opponent}
              onChange={e => setOpponent(e.target.value)}
            />
          </label>
        </div>
        <BtnDiv>
          <button type="submit">Create Game</button>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </BtnDiv>
      </form>
    </GameFormWrapper>
  );
};

export default GameForm;
