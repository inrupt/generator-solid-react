import React, { useState, useEffect, useCallback } from 'react';
import { NavBar, Notification } from '@components';
import { useTranslation } from 'react-i18next';
import { NavBarContainer } from './children';
import { LanguageDropdown } from '@util-components';
import { ldflexHelper, errorToaster } from '@utils';
import { NavigationItems } from '@constants';

type Props = {
  webId: string
};

const AuthNavBar = React.memo((props: Props) => {
  const [inboxes, setInbox] = useState([]);
  const { t, i18n } = useTranslation();
  const navigation = NavigationItems.map(item => ({ ...item, label: t(item.label) }));
  const { webId } = props;
  /**
   * Looks for all of the inbox containers in the pod and sets inboxes state
   */
  const discoverInbox = useCallback(async () => {
    try {
      let inboxes = [];
      /**
       * Get user's global inbox path from pod.
       */
      const globalInbox = await ldflexHelper.discoverInbox(webId);

      if (globalInbox) {
        inboxes = [
          ...inboxes,
          { path: globalInbox, inboxName: t('navBar.notifications.global'), shape: 'default' }
        ];
      }
      /**
       * If user doesn't has inbox in his pod will show an error and link to
       * know how fix it.
       */
      if (inboxes.length === 0)
        errorToaster(t('noInboxUser.message'), 'Error', {
          label: t('noInboxUser.link.label'),
          href: t('noInboxUser.link.href')
        });
      setInbox(inboxes);
    } catch (error) {
      /**
       * Show general errors
       */
      errorToaster(error.message, t('navBar.notifications.fetchingError'));
    }
  }, [webId, inboxes]);

  useEffect(() => {
    if (webId) {
      discoverInbox();
    }
  }, [webId]);
  const { history } = props;

  return (
    <NavBar
      navigation={navigation}
      sticky
      toolbar={[
        {
          component: () => <LanguageDropdown {...{ t, i18n }} />,
          id: 'language'
        },
        {
          component: () => <Notification {...{ webId, inbox: inboxes }} />,
          id: 'notifications'
        },
        {
          component: props => <NavBarContainer {...{ t, i18n, webId, history, ...props }} />,
          id: 'profile'
        }
      ]}
    />
  );
});

export default AuthNavBar;
