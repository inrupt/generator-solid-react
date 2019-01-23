import React, { Component } from "react";
import { withWebId, withAuthorization } from "@inrupt/solid-react-components";
import { Loader } from '@util-components';
import WelcomePageContent from "./welcome.component";
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
      name: '',
      image: ''
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
   * We are using ldflex for solid to featch user profile
   * in this case we need to create a new subject(hasPhoto)
   * because it's not on the context.json for more information please
   * go to: https://github.com/solid/query-ldflex
  */
  getProfileData = async () => {
    // fetching user card from pod(request call)
    const user = data[this.props.webId];
    /*
    * In the backgorund ldflex is using json-LD, for this reason we need to
    * made a async call, this will go and call json-LD expanded an expose the value(name).
    * for more information please go to: https://github.com/digitalbazaar/jsonld.js
    */
    const name = await user.name;

    // We send the value name and the image context to presenter component
    this.setState({ name: name.value, image: user[hasPhotoContext] });
  };

  render() {
    return (
      <WelcomePageContent name={this.state.name} image={this.state.image} />
    );
  }
}

export default withAuthorization(WelcomeComponent, <Loader show={true} />);
