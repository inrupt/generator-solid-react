import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { LiveUpdate, useNotification } from '@inrupt/solid-react-components';
import { ldflexHelper, buildPathFromWebId, errorToaster, notification } from '@utils';
import { Form, List } from './children';
import { Section, Wrapper } from '../tic-tac-toe.style';

const GameListPage = ({ webId }) => {
  const [opponent, setOpponent] = useState('https://jairo88.inrupt.net/profile/card#me');
  const [gamePath, setGamePath] = useState(null);
  const inboxUrl = buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_INBOX);
  const { createNotification, createInbox, notifications } = useNotification(webId);

  const sendNotification = useCallback(
    async content => {
      try {
        notification.sendNotification(opponent, content, createNotification);
      } catch (error) {
        errorToaster(error.message, 'Error');
      }
    },
    [opponent, notifications]
  );

  const init = async () => {
    const gamePath = await ldflexHelper.createContainer(process.env.REACT_APP_TICTAC_PATH);
    if (gamePath) {
      const url = buildPathFromWebId(webId, gamePath);
      await createInbox(inboxUrl);
      setGamePath(url);
    }
  };

  useEffect(() => {
    if (notifications && notifications.notify) init();
  }, [notifications]);

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
                opponent
              }}
            />
            {gamePath && (
              <LiveUpdate subscribe={buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_PATH)}>
                <List {...{ webId, gamePath }} />
              </LiveUpdate>
            )}
          </Fragment>
        )}
      </Wrapper>
    </Section>
  );
};

export default GameListPage;
