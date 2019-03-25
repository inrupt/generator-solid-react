import React, { Component } from "react";
import { UpdateContext, withWebId } from "@inrupt/solid-react-components";
import { withTranslation } from "react-i18next";
import AuthNavBar from "./auth-nav-bar.component";
import data from "@solid/query-ldflex";
import { withToastManager } from "react-toast-notifications";

let beforeContext = {};

class AuthNavBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { image: null };
  }

  getProfileData = async () => {
    try {
      // fetching user card from pod. This makes a request and returns the data
      const user = data.user;
      /*
       * In the background LDFlex is using JSON-LD. Because of this, we need to
       * make an async call. This will return a JSON-LD expanded object and expose the requested value(name).
       * for more information please go to: https://github.com/digitalbazaar/jsonld.js
       */
      const userName = await user.name;
      let userImage = await user.image;
      userImage = userImage ? userImage : await user.vcard_hasPhoto;
      const name = userName ? userName.value : "";
      const image = userImage ? userImage.value : "/img/icon/empty-profile.svg";
      this.setState({
        name,
        image
      });
    } catch (error) {
      this.props.toastManager.add (['Error', error.message], {
        appearance: 'error',
      });
    }
  };

  componentDidMount() {
    if (this.props.webId) {
      this.getProfileData();
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.webId && this.props.webId !== prevProps.webId) {
      this.getProfileData();
    }

    if (this.context && this.context.timestamp !== beforeContext.timestamp) {
      this.getProfileData();

      beforeContext = this.context;
    }
  }

  render() {
    const { image } = this.state;
    return <AuthNavBar img={image} {...this.props} {...this.state} />;
  }
}
AuthNavBarContainer.contextType = UpdateContext;


export default withTranslation()(withToastManager(withWebId(AuthNavBarContainer)));
