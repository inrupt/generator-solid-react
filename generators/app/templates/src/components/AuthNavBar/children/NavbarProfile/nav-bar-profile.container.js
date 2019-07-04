import React from 'react';
import { LiveUpdate } from '@inrupt/solid-react-components';
import NavBarProfile from './nav-bar-profile.component';

export const NavBarContainer = React.memo(props => {
  const { webId } = props;
  return webId ? (
    <LiveUpdate subscribe={webId.split('#')[0]}>
      <NavBarProfile {...props} />
    </LiveUpdate>
  ) : null;
});
