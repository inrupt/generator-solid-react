import React from 'react';
import AuthNavBar from './auth-nav-bar.component';

type Props = {
  location: Object,
  history: Object,
  webId: String
};

const AuthNavBarContainer = React.memo(({ location, webId, history }: Props) => (
  <AuthNavBar {...{ location, webId, history }} />
));
export default AuthNavBarContainer;
