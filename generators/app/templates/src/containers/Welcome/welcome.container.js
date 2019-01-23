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

  getProfileData = async () => {
    const user = data[this.props.webId];
    const name = await user.name;

    this.setState({ name: name.value, image: user[hasPhotoContext] });
  };

  render() {
    return (
      <WelcomePageContent name={this.state.name} image={this.state.image} />
    );
  }
}

export default withAuthorization(WelcomeComponent, <Loader show={true} />);
