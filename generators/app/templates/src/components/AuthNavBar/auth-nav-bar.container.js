import React from 'react';
import { withTranslation } from 'react-i18next';
import AuthNavBar from './auth-nav-bar.component';

type Props = {
  history: Object,
  location: Object,
  match: Object
};

const AuthNavBarContainer = React.memo(({ history, location, match }: Props) => (
  <AuthNavBar {...{ history, location, match }} />
));
export default withTranslation()(AuthNavBarContainer);
