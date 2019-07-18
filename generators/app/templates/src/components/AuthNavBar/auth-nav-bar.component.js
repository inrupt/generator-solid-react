import React, { useState, useEffect, useCallback } from 'react';
import { NavBar, Notification } from '@components';
import { useTranslation } from 'react-i18next';
import { NavBarContainer } from './children';
import { LanguageDropdown } from '@util-components';
import { buildPathFromWebId, ldflexHelper, errorToaster } from '@utils';

type Props = {
  webId: string
};

const AuthNavBar = React.memo((props: Props) => {
  const [inboxes, setInbox] = useState([]);
  const { t, i18n } = useTranslation();
  const navigation = [
    {
      id: 'welcome',
      icon: '/img/icon/apps.svg',
      label: t('navBar.welcome'),
      to: '/welcome'
    },
    {
      id: 'profile',
      icon: '/img/people.svg',
      label: t('navBar.profile'),
      to: '/profile'
    },
    {
      id: 'tictactoe',
      icon: '/img/icon/tictactoe.svg',
      label: t('navBar.tictactoe'),
      to: '/tictactoe'
    }
  ];
  const { webId } = props;
  const discoveryInbox = useCallback(async () => {
    try {
      let inboxes = [];
      const globalInbox = await ldflexHelper.discoveryInbox(webId);

      if (globalInbox) {
        inboxes = [
          ...inboxes,
          { path: globalInbox, inboxName: t('navBar.notifications.global'), shape: 'default' }
        ];
      }
      const appInbox = await ldflexHelper.discoveryInbox(
        buildPathFromWebId(webId, `${process.env.REACT_APP_TICTAC_PATH}settings.ttl`)
      );

      if (appInbox) {
        inboxes = [
          ...inboxes,
          { path: appInbox, inboxName: t('navBar.notifications.tictactoe'), shape: 'default' }
        ];
      }
      if (inboxes.length === 0) throw new Error(t('navBar.notifications.noinbox'));
      setInbox(inboxes);
    } catch (error) {
      errorToaster(error.message, t('navBar.notifications.fetchingError'));
    }
  }, [webId, inboxes]);

  useEffect(() => {
    if (webId) {
      discoveryInbox();
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
