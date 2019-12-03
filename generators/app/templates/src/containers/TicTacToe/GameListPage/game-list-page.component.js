import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { LiveUpdate, useNotification, AccessControlList } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import data from '@solid/query-ldflex';
import { namedNode } from '@rdfjs/data-model';
import { errorToaster, storageHelper, permissionHelper, ldflexHelper } from '@utils';
import { Form, List } from './children';
import { Section, Wrapper } from '../tic-tac-toe.style';

const GameListPage = ({ webId }) => {
  const [opponent, setOpponent] = useState('');
  const [gamePath, setGamePath] = useState(null);
  const { createNotification, notifications, notification, createInbox } = useNotification(webId);
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

  /**
   * Helper function to create or repair missing game files, such as the inbox and surrounding settings
   * @param gamePath
   * @returns {Promise<void>}
   */
  async function initializeOrRepairGameFiles(gamePath) {
    // Set inbox path relative to the existing app's path in the pod
    const settingsFilePath = `${gamePath}settings.ttl`;
    let inboxPath = `${gamePath}inbox/`;
    let hasInboxLink = false;

    // Check if the settings file contains a link to the inbox. If so, save it as inboxPath
    const inboxLinkedPath = await ldflexHelper.getLinkedInbox(settingsFilePath);
    if (inboxLinkedPath) {
      inboxPath = inboxLinkedPath;
      hasInboxLink = true;
    }

    // First, check if we have WRITE permission for the app
    const hasWritePermission = await permissionHelper.checkSpecificAppPermission(
      webId,
      AccessControlList.MODES.WRITE
    );
    // If so, try to create the inbox. No point in trying to create it if we don't have permissions
    if (hasWritePermission) {
      await createInbox(inboxPath, gamePath);

      // Check for CONTROL permissions to see if we can set permissions or not
      const hasControlPermissions = await permissionHelper.checkSpecificAppPermission(
        webId,
        AccessControlList.MODES.CONTROL
      );

      // If the user has Write and Control permissions, check the inbox settings
      if (hasControlPermissions) {
        // Check if the inbox permissions are set to APPEND for public, and if not fix the issue
        await permissionHelper.checkOrSetInboxAppendPermissions(inboxPath, webId);
      }

      if (!hasInboxLink) {
        await data[settingsFilePath].inbox.set(namedNode(inboxPath));
      }
    }
  }

  const init = async () => {
    try {
      const gamePath = await storageHelper.getAppStorage(webId);

      // Fetch the game's path in the pod, based on user's storage settings
      await storageHelper.createInitialFiles(webId);

      if (gamePath) {
        await initializeOrRepairGameFiles(gamePath);
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
