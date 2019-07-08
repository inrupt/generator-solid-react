import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { namedNode } from '@rdfjs/data-model';
import N3 from 'n3';
import tictactoeShape from '@contexts/tictactoe-shape.json';
import { ldflexHelper, errorToaster, successToaster, buildPathFromWebId } from '@utils';

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

type Props = {
  webId: String,
  sendNotification: () => void,
  opponent: string,
  setOpponent: () => void
};

const GameForm = ({ webId, sendNotification, opponent, setOpponent }: Props) => {
  const uniqueIdentifier = Date.now();
  const [documentUri, setDocumentUri] = useState(`${uniqueIdentifier}.ttl`);

  const reset = () => {
    setDocumentUri('');
    setOpponent('');
  };

  const initialGame = opponent => ({
    gamestatus: 'Move X',
    createddatetime: moment().format(),
    updateddatetime: moment().format(),
    sender: namedNode(webId),
    opponent: namedNode(opponent),
    firstmove: 'X',
    moveorder: ''
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
          await document[predicate].add(setupObj[field.predicate]);
        }

        const target = `${window.location.href}/${btoa(documentUri)}`;
        await sendNotification({
          title: 'Tictactoe invitation',
          summary: 'You have been invited to play Tic-Tac-Toe.',
          sender: webId,
          object: documentUri,
          target
        });
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  const createACLFile = async (documentUri, body) => {
    try {
      ldflexHelper.createDocumentWithTurtle(documentUri, body);
    } catch (e) {
      throw new Error('Error while creating ACL');
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
    try {
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
      const owner = `${aclDocument}#owner`;
      const publicSubject = `${aclDocument}#public`;
      const opponentSubject = `${aclDocument}#opponent`;

      const writer = new N3.Writer({ prefixes });
      const ownerQuads = createDefaultQuads(['Control', 'Read', 'Write'], webId, owner, prefixes);

      const opponentQuads = createDefaultQuads(
        ['Read', 'Write'],
        opponent,
        opponentSubject,
        prefixes
      );

      const publicQuads = createDefaultQuads(['Read'], null, publicSubject, prefixes);

      const quads = [...ownerQuads, ...opponentQuads, ...publicQuads];
      const testQuads = quads.map(quadItem => {
        const { subject, predicate, object } = quadItem;
        return quad(namedNode(subject), namedNode(predicate), object);
      });
      testQuads.forEach(quad => writer.addQuad(quad));
      writer.end(async (error, result) => {
        if (!error) {
          await createACLFile(aclDocument, result);
        }
      });
    } catch (e) {
      throw e;
    }
  };

  const onSubmit = async e => {
    try {
      e.preventDefault();
      const documentPath = buildPathFromWebId(
        webId,
        `${process.env.REACT_APP_TICTAC_PATH}${documentUri}`
      );

      await createGame(documentPath, opponent);
      await aclTurtle(documentPath, opponent);
      successToaster('Game created successfully', 'Success');
    } catch (e) {
      errorToaster(e.message);
    }
  };

  return (
    <GameFormWrapper onSubmit={onSubmit}>
      <h1>Tic Tac Toe</h1>
      <hr />
      <form>
        <span>Enter an Opponent and a Game id</span>
        <div className="input-wrap">
          <label htmlFor="documentUriInput">
            Game Id
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
