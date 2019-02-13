import React, { Component } from "react";
import WelcomePageContent from "./welcome.component";
import { withWebId } from "@inrupt/solid-react-components";
import data from "@solid/query-ldflex";

// Manually-created vcard#hasPhoto context link
const hasPhotoContext = "http://www.w3.org/2006/vcard/ns#hasPhoto";
// img context 
const imgContext = "http://xmlns.com/foaf/0.1/img"

/**
 * Container component for the Welcome Page, containing example of how to fetch data from a POD
 */
class WelcomeComponent extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      image: "",
      isLoading: false
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
   * This function retrieves a user's card data and tries to grab both the user's name and profile photo if they exist.
   *
   * This is an example of how to use the LDFlex library to fetch different linked data fields.
   */
  getProfileData = async () => {
    this.setState({ isLoading: true });

    /*
     * This is an example of how to use LDFlex. Here, we're loading the webID link into a user variable. This user object
     * will contain all of the data stored in the webID link, such as profile information. Then, we're grabbing the user.name property
     * from the returned user object.
     */
    const user = data[this.props.webId];
    const nameLd = await user.name;

    const name = nameLd ? nameLd.value : "";

    let imageLd = await user[imgContext];
    imageLd = imageLd ? imageLd : await user[hasPhotoContext];

    const image =  imageLd ? imageLd.value : "/img/icon/empty-profile.svg";

    /**
     * This is where we set the state with the name and image values. The user[hasPhotoContext] line of code is an example of
     * what to do when LDFlex doesn't have the full context. LDFlex has many data contexts already in place, but in case
     * it's missing, you can manually add it like we're doing here.
     *
     * The hasPhotoContext variable stores a link to the definition of the vcard ontology and, specifically, the #hasPhoto
     * property that we're using to store and link the profile image.
     *
     * For more information please go to: https://github.com/solid/query-ldflex
     */
    this.setState({ name, image, isLoading: false });
  };

  render() {
    const { name, image, isLoading } = this.state;
    return (
      <WelcomePageContent name={name} image={image} isLoading={isLoading} />
    );
  }
}

export default withWebId(WelcomeComponent);
