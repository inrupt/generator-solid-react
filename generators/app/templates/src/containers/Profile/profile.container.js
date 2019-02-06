import React, { Component } from "react";
import { withWebId } from "@inrupt/solid-react-components";
import { withToastManager } from "react-toast-notifications";
import data from "@solid/query-ldflex";
import ProfileShape from "@contexts/profile-shape.json";
import ProfileComponent from "./profile.component";

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
      photo: defaulProfilePhoto,
      isLoading: false
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.fetchPhoto();
    await this.fetchProfile();
    this.setState({ isLoading: false });
  }
  changeFormMode = () => {
    this.setState({ formMode: !this.state.formMode });
  };
  /**
   * onChangeInput will update a field into formFields array
   * and will add updated flag to true, this will be taken
   * for submit form to check which fields needs to be sent to POD
   */
  onInputChange = (e: Event) => {
    const name = e.target.name;
    const value = e.target.value;

    const updatedFormField = this.state.formFields.map(field => {
      if (field.property === name || field.blankNode === name) {
        return {
          ...field,
          updated: true,
          value
        };
      }

      return { ...field };
    });

    this.setState({ formFields: updatedFormField });
  };
  /**
   * onSubmit will send all the updated fields to POD
   * fields that was not updated will be not send it.
   */
  onSubmit = async (e: Event) => {
    try {
      e.preventDefault();
      let node;
      const updatedFormField = await Promise.all(
        this.state.formFields.map(async field => {
          if (field.updated) {
            node = data.user[field.property];
            if (field.blankNode) {
              node = data[field.nodeParentUri][field.blankNode];
            }

            field.action === "update"
              ? await node.set(field.value)
              : await node.add(field.value);

            return {
              ...field,
              action: "update",
              updated: false
            };
          }
          return { ...field };
        })
      );
      this.props.toastManager.add("Profile was updated successfully", {
        appearance: "success"
      });
      this.setState({ formFields: updatedFormField, formMode: true });
    } catch (error) {
      this.props.toastManager.add(error.message, { appearance: "error" });
    }
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
      let hasImage = true;
      // If image is not present on card we try with hasPhoto
      if (!image) {
        /**
         * hasPhoto is a new context that ldflex doesn't having
         * we need to add it manually.
         * if you want to know more about context please go to:
         * https://github.com/digitalbazaar/jsonld.js
         */
        image = await user["vcard:hasPhoto"];

        hasImage = false;
      }

      this.setState({
        photo: (image && image.value) || defaulProfilePhoto,
        hasImage
      });
    } catch (error) {
      this.props.toastManager.add(error.message, { appearance: "error" });
    }
  };
  /**
   * updatedPhoto will update the photo url on vcard file
   * this function will check if user has image or hasPhoto node if not
   * will just update it, the idea is use image instead of hasPhoto
   * @params{String} uri photo url
   */
  updatePhoto = async (uri: String) => {
    try {
      const { user } = data;
      this.state.hasImage
        ? await user.image.set(uri)
        : await user.image.add(uri);

      this.props.toastManager.add("Profile Image was updated", {
        appearance: "success"
      });
    } catch (error) {
      this.props.toastManager.add(error.message, { appearance: "error" });
    }
  };
  /**
   * Fetch Profile Shape data
   */
  fetchProfile = async () => {
    try {
      /**
       * We fetch profile shape from context/profile-shape.json
       * profile-shape.json has all the fields that we want to print
       * we are using icons on each field to mapping with the UI design.
       */
      const { profile } = ProfileShape;
      // We are fetching profile card document
      const user = data[this.props.webId];

      /**
       * We run each shapes on profile-shape.json and access to each
       * field value, in case that node field value point to another
       * node blank we acces using multidimensional array if not we
       * access by a basic array.
       */
      const formFields = await Promise.all(
        profile.map(async field => {
          return {
            ...field,
            ...(await this.getNodeValue(user, field))
          };
        })
      );
      this.setState({ profile, formFields });
    } catch (error) {
      this.props.toastManager.add(error.message, { appearance: "error" });
    }
  };
  /**
   * getNodeValue will return node value and uri in case that node points to nodeBlank
   * nodeParentUri is a workaround to fix blank node update fields on ldflex
   * @params{Object} user
   * @params{Object} field
   */
  getNodeValue = async (user: Object, field: Object) => {
    let node;
    let nodeParentUri;

    if (field.blankNode) {
      const parentNode = await user[field.property];

      node = await user[field.property][field.blankNode];
      nodeParentUri = (parentNode && parentNode.value) || "";
    } else {
      node = await user[field.property];
    }

    const nodeValue = node && node.value;

    return {
      action: nodeValue ? "update" : "create",
      value: nodeValue || "",
      nodeParentUri
    };
  };
  render() {
    return (
      <ProfileComponent
        webId={this.props.webId}
        formFields={this.state.formFields}
        formMode={this.state.formMode}
        onInputChange={this.onInputChange}
        onSubmit={this.onSubmit}
        updatePhoto={this.updatePhoto}
        photo={this.state.photo}
        changeFormMode={this.changeFormMode}
        isLoading={this.state.isLoading}
      />
    );
  }
}

export default withWebId(withToastManager(Profile));
