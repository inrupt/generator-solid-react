import React from 'react';
import AuthNavBar from './auth-nav-bar.component';

type Props = {
  location: Object,
  webId: String
};

const AuthNavBarContainer = React.memo(({ location, webId }: Props) => (
  <AuthNavBar {...{ location, webId }} />
));
export default AuthNavBarContainer;
