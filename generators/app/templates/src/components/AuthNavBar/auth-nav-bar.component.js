import React, { useState, useEffect, useCallback } from 'react';
import { NavBar, Notification } from '@components';
import { useTranslation } from 'react-i18next';
import { NavBarContainer } from './children';
import { LanguageDropdown } from '@util-components';
import { buildPathFromWebId, ldflexHelper } from '@utils';

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
  const discoveryAppInbox = useCallback(async () => {
    const globalInbox = await ldflexHelper.discoveryInbox(webId);
    const appPath = buildPathFromWebId(webId, `${process.env.REACT_APP_TICTAC_PATH}`);
    const settingsDoc = `${appPath}inbox/`;

    setInbox([
      { path: globalInbox, inboxName: 'Global', shape: 'default' },
      { path: settingsDoc, inboxName: 'TicTactoe Game', shape: 'default' }
    ]);
  }, [webId]);

  useEffect(() => {
    if (webId) {
      discoveryAppInbox();
    }
  }, [webId]);
  return (
    inboxes.length > 0 && (
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
            component: ({ open, customClass }) => (
              <NavBarContainer {...{ t, i18n, open, webId, customClass }} />
            ),
            id: 'profile'
          }
        ]}
      />
    )
  );
});

export default AuthNavBar;
