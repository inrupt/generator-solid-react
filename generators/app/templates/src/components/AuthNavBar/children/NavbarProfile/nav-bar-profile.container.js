import React from 'react';
import { LiveUpdate, useWebId } from '@inrupt/solid-react-components';
import NavBarProfile from './nav-bar-profile.component';

export const NavBarContainer = props => {
  const webId = useWebId();
  return webId ? (
    <LiveUpdate subscribe={webId.split('#')[0]}>
      <NavBarProfile {...props} />
    </LiveUpdate>
  ) : null;
};
