import React, { Component } from "react";
import { withWebId } from "@inrupt/solid-react-components";
import { withToastManager } from "react-toast-notifications";
import data from "@solid/query-ldflex";
import ProfileShape from "@contexts/profile-shape.json";
import { ProfileComponent } from "./profile.component";

const defaulProfilePhoto = "/img/icon/empty-profile.svg";

/**
 * We are using ldflex to fetch profile data from a solid pod.
 * ldflex libary is using json-LD for this reason you will see async calls
 * when we want to get a field value, why ? becuase they are expanded the data
 * this means the result will have a better format to read on Javascript.
 * for more information please go to: https://github.com/solid/query-ldflex
 */

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formFields: [],
      formMode: true,
      photo: defaulProfilePhoto
    };
  }
  componentDidMount() {
    this.fetchPhoto();
    this.fetchShape();
  }
  changeFormMode = () => {
    this.setState({ formMode: !this.state.formMode });
  };
  /**
   * Fetch profile photo from card
   */
  fetchPhoto = async () => {
    try {
      // We are fetching profile card document
      const user = data[this.props.webId];
      // We access to document node using a node name
      let image = await user.image;
      // If image is not present on card we try with hasPhoto
      if (!image) {
        /**
         * hasPhoto is a new context that ldflex doesn't having
         * we need to add it manually.
         * if you want to know more about context please go to:
         * https://github.com/digitalbazaar/jsonld.js
         */
        image = await user["vcard:hasPhoto"];
      }

      this.setState({ photo: (image && image.value) || defaulProfilePhoto });
    } catch (error) {
      this.props.toastManager.add(error.message, { appearance: "error" });
    }
  };
  /**
   * Fetch Profile Shape data
   */
  fetchShape = async () => {
    try {
      /**
       * We fetch profile shape from context/profile-shape.json
       * profile-shape.json has all the fields that we want to print
       * we are using icons on each field to mapping with the UI design.
       */
      const { profile } = ProfileShape;
      // We are fetching profile card document
      const user = data[this.props.webId];
      let node;

      /**
       * We run each shapes on profile-shape.json and access to each
       * field value, in case that node field value point to another
       * node blank we acces using multidimensional array if not we
       * access by a basic array.
       */
      const formFields = await Promise.all(
        profile.shape.map(async field => {
          node = field.blankNode
            ? await user[field.property][field.blankNode]
            : await user[field.property];
          return {
            ...field,
            value: (node && node.value) || ""
          };
        })
      );
      this.setState({ profile, formFields });
    } catch (error) {
      this.props.toastManager.add(error.message, { appearance: "error" });
    }
  };
  render() {
    return (
      <ProfileComponent
        webId={this.props.webId}
        formFields={this.state.formFields}
        formMode={this.state.formMode}
        photo={this.state.photo}
        changeFormMode={this.changeFormMode}
      />
    );
  }
}

export default withWebId(withToastManager(Profile));
