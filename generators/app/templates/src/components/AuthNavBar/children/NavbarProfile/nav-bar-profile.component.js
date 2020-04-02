import React, { Component } from 'react';
import styled from 'styled-components';
import { UpdateContext } from '@inrupt/solid-react-components';
import { Dropdown } from '@util-components';

import auth from 'solid-auth-client';
import data from '@solid/query-ldflex';
import { errorToaster } from '@utils';
import { ProfileOptions } from '@constants/navigation';

export const ImageContainer = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-size: cover;
  overflow: hidden;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

export const Img = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

export const LoadingImage = styled(ImageContainer)`
  background: #cccccc;
  display: block;
`;

export const UserName = styled.span`
  display: inline-block;
  margin-left: 10px;
`;

type Props = {
  history: Object,
  t: Function,
  open: Boolean,
  customClass: String,
  webId: String
};

let beforeContext;

class NavBarProfile extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { image: '/img/icon/empty-profile.svg' };
  }

  state = {
    imageLoaded: false
  };

  componentDidMount() {
    this.getProfileData();
  }

  /**
   * Checks everytime the timestamp changes to go and fetch the data again
   */
  componentDidUpdate(prevProps) {
    const { webId } = this.props;
    if (webId && webId !== prevProps.webId) this.getProfileData();
    if (this.context) {
      const { timestamp } = this.context;
      if (timestamp !== beforeContext) {
        this.getProfileData();
        beforeContext = timestamp;
      }
    }
  }

  // eslint-disable-next-line react/destructuring-assignment
  profileRedirect = () => this.props.history.push('/profile');

  // eslint-disable-next-line react/destructuring-assignment
  formModelRenderRedirect = () => this.props.history.push('/formModel/renderer');

  // eslint-disable-next-line react/destructuring-assignment
  formModelConvertRedirect = () => this.props.history.push('/formModel/converter');

  onImageLoaded = async () => this.setState({ imageLoaded: true });

  logOut = async () => {
    try {
      await auth.logout();

      let logoutRedirect = '/login';
      // It seems that solid-auth-client has an OIDC-compliance issue in the logout.
      // This bevahiour is accepted by the NSS IdP, but not by other OIDC-compliant IdPs.
      // This issue should be fixed in the upstream library, but in the meantime
      // the following is an acceptable **temporary** compatibility fix.
      const authConfig = JSON.parse(localStorage.getItem('solid-auth-client'));
      // It happens that post_logout_redirect_uris is not defined by NSS IdP,
      // which enables discriminating when the issue is going to be encountered.
      if (authConfig.rpConfig.registration.post_logout_redirect_uris) {
        // The user MUST be redirected to a page where they confirm they want to logout.
        logoutRedirect = authConfig.rpConfig.provider.configuration.end_session_endpoint;
      }

      // Remove localStorage
      localStorage.removeItem('solid-auth-client');

      // Redirect to login page or to logout confirmation
      window.location = logoutRedirect;
    } catch (error) {
      errorToaster(error.message, 'Error');
    }
  };

  getProfileData = async () => {
    try {
      // fetching user card from pod. This makes a request and returns the data
      const { user } = data;
      /*
       * In the background LDFlex is using JSON-LD. Because of this, we need to
       * make an async call. This will return a JSON-LD expanded object and expose the requested value(name).
       * for more information please go to: https://github.com/digitalbazaar/jsonld.js
       */
      const userImage = await user.vcard_hasPhoto;
      const { image: defaultimage } = this.state;
      const image = userImage ? userImage.value : defaultimage;
      this.setState({ image });
    } catch (error) {
      errorToaster(error.message, 'Error');
    }
  };

  render() {
    const { t, open, customClass } = this.props;
    const { imageLoaded, image } = this.state;

    const profileOpts = ProfileOptions.map(item => ({
      ...item,
      label: t(item.label),
      onClick: this[item.onClick]
    }));

    return image ? (
      <Dropdown
        actions={profileOpts}
        className={`nav-bar--profile ${customClass}`}
        open={open}
        hover
      >
        <ImageContainer show={imageLoaded}>
          <Img show={imageLoaded} src={image} alt="profile" onLoad={this.onImageLoaded} />
        </ImageContainer>
        {!imageLoaded && <LoadingImage show />}
      </Dropdown>
    ) : (
      <div />
    );
  }
}

NavBarProfile.contextType = UpdateContext;

export default NavBarProfile;
