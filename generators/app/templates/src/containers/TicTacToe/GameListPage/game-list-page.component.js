import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { LiveUpdate, useNotification, AccessControlList } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import { errorToaster, storageHelper, permissionHelper, successToaster } from '@utils';
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
   * Helper function to fetch permissions for the game inbox, and if permissions are not set
   * correctly, then add them. This repairs a broken inbox.
   * @param inboxPath
   * @returns {Promise<void>}
   */
  async function checkOrSetInboxAppendPermissions(inboxPath) {
    // Fetch app permissions for the inbox and see if Append is there
    const inboxAcls = new AccessControlList(webId, inboxPath);
    const permissions = await inboxAcls.getPermissions();
    const inboxPublicPermissions = permissions.filter(perm => perm.agents === null);

    const appendPermission = inboxPublicPermissions.filter(perm =>
      perm.modes.includes(AccessControlList.MODES.APPEND)
    );

    if (appendPermission.length <= 0) {
      // What do we do when the permission is missing? Add it!
      try {
        // Permission object to add. A null agent means Everyone
        const permissions = [
          {
            agents: null,
            modes: [AccessControlList.MODES.APPEND]
          }
        ];
        const ACLFile = new AccessControlList(webId, inboxPath);
        await ACLFile.createACL(permissions);

        // TODO: Make this i18n and get final text
        successToaster('Game inbox permissions set. Everyone now has Append access.');
      } catch (error) {
        // TODO: Better error handling here
        console.log(error);
      }
    }
  }

  /**
   * Helper function to create or repair missing game files, such as the inbox and surrounding settings
   * @param gamePath
   * @returns {Promise<void>}
   */
  async function initializeOrRepairGameFiles(gamePath) {
    // Set inbox path relative to the existing app's path in the pod
    const inboxPath = `${gamePath}inbox/`;

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
        await checkOrSetInboxAppendPermissions(inboxPath);
      }
    }
  }

  const init = async () => {
    try {
      // Fetch the game's path in the pod, based on user's storage settings
      const gamePath = await storageHelper.createInitialFiles(webId);

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
