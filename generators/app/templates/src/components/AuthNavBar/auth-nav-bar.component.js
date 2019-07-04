import React from 'react';
import { NavBar, Notifications } from '@components';
import { useTranslation } from 'react-i18next';
import { NavBarContainer } from './children';
import { LanguageDropdown } from '@util-components';

type Props = {
  webId: string
};

const AuthNavBar = (props: Props) => {
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
      icon: '/img/people.svg',
      label: t('navBar.tictactoe'),
      to: '/tictactoe'
    }
  ];
  const { webId } = props;
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
          component: () => <Notifications />,
          id: 'notifications'
        },
        {
          component: ({ open, customClass }) => (
            <NavBarContainer {...{ t, i18n }} open={open} webId={webId} customClass={customClass} />
          ),
          id: 'profile'
        }
      ]}
    />
  );
};

export default AuthNavBar;
