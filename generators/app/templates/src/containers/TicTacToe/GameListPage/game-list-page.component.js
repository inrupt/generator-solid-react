import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { LiveUpdate, useNotification } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import { ldflexHelper, buildPathFromWebId, errorToaster } from '@utils';
import { Form, List } from './children';
import { Section, Wrapper } from '../tic-tac-toe.style';

const GameListPage = ({ webId }) => {
  const [opponent, setOpponent] = useState('https://jprod.solid.community/profile/card#me');
  const [gamePath, setGamePath] = useState(null);
  const { createNotification, createInbox, notifications, notification } = useNotification(webId);
  const { t } = useTranslation();

  const sendNotification = useCallback(
    async (content, to) => {
      try {
        await createNotification(content, to);
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
      /**
       * Check if something fails when we try to create a inbox
       * and show user a possible solution
       */
      if (e.name === 'Inbox Error') {
        return errorToaster(e.message, 'Error', {
          label: t('errorCreateInbox.link.label'),
          href: t('errorCreateInbox.link.href')
        });
      }

      errorToaster(e.message, 'Error');
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
