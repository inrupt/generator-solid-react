import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { LiveUpdate, useNotification } from '@inrupt/solid-react-components';
import {
  ldflexHelper,
  buildPathFromWebId,
  errorToaster,
  notification as helperNotification
} from '@utils';
import { Form, List } from './children';
import { Section, Wrapper } from '../tic-tac-toe.style';

const GameListPage = ({ webId }) => {
  const [opponent, setOpponent] = useState('https://jprod.solid.community/profile/card#me');
  const [gamePath, setGamePath] = useState(null);
  const { createNotification, createInbox, notifications, notification } = useNotification(webId);

  const sendNotification = useCallback(
    async content => {
      try {
        helperNotification.sendNotification(opponent, content, createNotification);
      } catch (error) {
        errorToaster(error.message, 'Error');
      }
    },
    [opponent, notifications, notification]
  );

  const init = async () => {
    try {
      const url = buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_PATH);
      const gamePath = await ldflexHelper.createContainer(url);
      if (gamePath) {
        await createInbox(`${gamePath}inbox/`, gamePath);
        setGamePath(gamePath);
      }
    } catch (e) {
      if (e.code !== 303) errorToaster(e.message);
    }
  };

  useEffect(() => {
    if (webId && notification.notify) init();
  }, [webId, notification.notify]);
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
