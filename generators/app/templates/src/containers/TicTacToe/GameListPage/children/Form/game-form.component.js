import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { namedNode } from '@rdfjs/data-model';
import N3 from 'n3';
import tictactoeShape from '@contexts/tictactoe-shape.json';
import {
  ldflexHelper,
  errorToaster,
  successToaster,
  buildPathFromWebId,
  notification as helperNotification
} from '@utils';
import { GameFormWrapper, BtnDiv } from './game-form.styles';

type Props = {
  webId: String,
  sendNotification: () => void,
  opponent: string,
  setOpponent: () => void
};

const GameForm = ({ webId, sendNotification, opponent, setOpponent }: Props) => {
  const uniqueIdentifier = Date.now();
  const [documentUri, setDocumentUri] = useState(`${uniqueIdentifier}.ttl`);
  const { t } = useTranslation();

  const reset = () => {
    setDocumentUri('');
    setOpponent('');
  };

  const initialGame = opponent => ({
    gamestatus: 'Awaiting',
    createddatetime: moment().format(),
    updateddatetime: moment().format(),
    actor: namedNode(webId),
    opponent: namedNode(opponent),
    firstmove: 'X',
    moveorder: ''
  });

  const createGame = async (documentUri: String, opponent: String) => {
    try {
      /**
       * Get full opponent game path
       */
      const gameSettings = buildPathFromWebId(
        opponent,
        `${process.env.REACT_APP_TICTAC_PATH}/settings.ttl`
      );
      /**
       * Find opponent inboxes from a document link
       */
      const inboxes = await helperNotification.findUserInboxes([
        { path: opponent, name: 'Global' },
        { path: gameSettings, name: 'Game' }
      ]);
      /**
       * If opponent has at least one inbox will create a game and send notification
       * if not will show an error.
       */
      if (inboxes.length > 0) {
        const newDocument = await ldflexHelper.createNonExistentDocument(documentUri);
        if (newDocument) {
          const document = await ldflexHelper.fetchLdflexDocument(documentUri);
          const setupObj = initialGame(opponent);

          for await (const field of tictactoeShape.shape) {
            const prefix = tictactoeShape['@context'][field.prefix];
            const predicate = `${prefix}${field.predicate}`;
            await document[predicate].add(setupObj[field.predicate]);
          }
          /**
           * Find opponent game inbox if doesn't exist get global
           * @to: Opponent inbox path
           */
          const to = helperNotification.getDefaultInbox(inboxes, 'Game', 'Global');
          const target = `${window.location.href}/${btoa(documentUri)}`;
          await sendNotification(
            {
              title: 'Tictactoe invitation',
              summary: 'has invited you to play Tic-Tac-Toe.',
              actor: webId,
              object: documentUri,
              target
            },
            to.path
          );

          setDocumentUri(`${Date.now()}.ttl`);
        } else {
          errorToaster(`${opponent} ${t('game.createFolder')}`, 'Error');
        }
      } else {
        errorToaster(`${opponent} ${t('noInboxOpponent.message')}`, 'Error', {
          label: t('noInboxOpponent.link.label'),
          href: t('noInboxOpponent.link.href')
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
    <GameFormWrapper onSubmit={onSubmit} data-testid="game-form">
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
              data-testid="uri-input"
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
              data-testid="webId"
            />
          </label>
        </div>
        <BtnDiv>
          <button type="submit" data-testid="form-submit">Create Game</button>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </BtnDiv>
      </form>
    </GameFormWrapper>
  );
};

export default GameForm;
