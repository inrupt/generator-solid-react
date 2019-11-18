import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { LiveUpdate, useNotification } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import { errorToaster, storageHelper } from '@utils';
import { Form, List } from './children';
import { Section, Wrapper } from '../tic-tac-toe.style';

const GameListPage = ({ webId }) => {
  const [opponent, setOpponent] = useState('');
  const [gamePath, setGamePath] = useState(null);
  const { createNotification, notifications, notification } = useNotification(webId);
  const { t } = useTranslation();

  const sendNotification = useCallback(
    async (content, to, type, license) => {
      try {
        await createNotification(content, to, type, license);
      } catch (error) {
        errorToaster(error.message, 'Error');
      }
    },
    [opponent, notifications, notification]
  );

  const init = async () => {
    try {
      await storageHelper.createInitialFiles(webId);
      setGamePath('');
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
    <Section data-testid="game-list">
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
              <LiveUpdate subscribe={gamePath}>
                <List {...{ webId, gamePath, sendNotification }} />
              </LiveUpdate>
            )}
          </Fragment>
        )}
      </Wrapper>
    </Section>
  );
};

export default GameListPage;
