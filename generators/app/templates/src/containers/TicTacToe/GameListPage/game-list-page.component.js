import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useWebId, LiveUpdate, useNotification } from '@inrupt/solid-react-components';
import { ldflexHelper, buildPathFromWebId, errorToaster, notification } from '@utils';
import { Form, List } from './children';
import { Section, Wrapper } from '../tic-tac-toe.style';

const GameListPage = props => {
  const webId = useWebId();
  const [opponent, setOpponent] = useState('https://jairo88.inrupt.net/profile/card#me');
  const inboxUrl = buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_INBOX);
  const { createNotification, createInbox } = useNotification(inboxUrl, webId);

  const sendNotification = useCallback(
    async content => {
      try {
        notification.sendNotification(opponent, content, createNotification);
      } catch (error) {
        errorToaster(error.message, 'Error');
      }
    },
    [opponent]
  );

  useEffect(() => {
    ldflexHelper.createContainer(process.env.REACT_APP_TICTAC_PATH);
  }, []);

  useEffect(() => {
    if (webId) {
      createInbox();
    }
  }, [webId]);

  return (
    <Section>
      <Wrapper>
        {webId && (
          <Fragment>
            <Form
              {...{
                webId,
                sendNotification,
                setOpponent,
                opponent,
                ...props
              }}
            />
            <LiveUpdate subscribe={buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_PATH)}>
              <List {...{ webId, ...props }} />
            </LiveUpdate>
          </Fragment>
        )}
      </Wrapper>
    </Section>
  );
};

export default GameListPage;
