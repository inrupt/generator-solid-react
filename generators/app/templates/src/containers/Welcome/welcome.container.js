import React, { Component } from "react";
import WelcomePageContent from "./welcome.component";
import { withWebId } from "@inrupt/solid-react-components";
import data from "@solid/query-ldflex";

// hasPhoto context
const hasPhotoContext = "http://www.w3.org/2006/vcard/ns#hasPhoto";

/**
 * Container component for the Welcome Page, containing example of how to fetch data from a POD
 */
class WelcomeComponent extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      image: ""
    };
  }
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
  /**
   * We are using LDFlex for Solid to fetch a user's profile.
   * In this case we need to create a new Subject(hasPhoto)
   * because it's not listed in the context.json file inside of the ldflex repository
   * For more information please go to: https://github.com/solid/query-ldflex
   */
  getProfileData = async () => {
    // fetching user card from pod. This makes a request and returns the data
    const user = data[this.props.webId];
    /*
     * In the backgorund LDFlex is using JSON-LD. Because of this, we need to
     * make an async call. This will return a JSON-LD expanded object and expose the requested value(name).
     * for more information please go to: https://github.com/digitalbazaar/jsonld.js
     */
    const name = await user.name;
    this.setState({ name: name.value, image: user[hasPhotoContext] });
  };

  render() {
    return (
      <WelcomePageContent name={this.state.name} image={this.state.image} />
    );
  }
}

export default withWebId(WelcomeComponent);
