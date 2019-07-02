import React, { Component } from 'react';
import { withWebId } from '@inrupt/solid-react-components';
import { withTranslation } from 'react-i18next';
import AuthNavBar from './auth-nav-bar.component';

class AuthNavBarContainer extends Component {
  render() {
    return <AuthNavBar {...this.props} {...this.state} />;
  }
}
export default withTranslation()(withWebId(AuthNavBarContainer));
