import React, { Component } from "react";
import { withWebId } from "@inrupt/solid-react-components";
import AuthNavBar from "./auth-nav-bar.component";
import data from "@solid/query-ldflex";

// hasPhoto context
const hasPhotoContext = "http://www.w3.org/2006/vcard/ns#hasPhoto";
// img context 
const imgContext = "http://xmlns.com/foaf/0.1/img"

class AuthNavBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { image: null };
  }

  getProfileData = async () => {
    try {
      // fetching user card from pod. This makes a request and returns the data
      const user = data[this.props.webId];
      /*
       * In the backgorund LDFlex is using JSON-LD. Because of this, we need to
       * make an async call. This will return a JSON-LD expanded object and expose the requested value(name).
       * for more information please go to: https://github.com/digitalbazaar/jsonld.js
       */
      const userName = await user.name;
      let userImage = await user[imgContext];
      userImage = userImage ? userImage : await user[hasPhotoContext];
      const name = userName ? userName.value : "";
      const image = userImage ? userImage.value : "/img/icon/empty-profile.svg";
      this.setState({
        name,
        image
      });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    if (this.props.webId) {
      this.getProfileData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.webId && this.props.webId !== prevProps.webId) {
      this.getProfileData();
    }
  }

  render() {
    const { image } = this.state;
    return <AuthNavBar img={image} {...this.props}/>;
  }
}

export default withWebId(AuthNavBarContainer);
