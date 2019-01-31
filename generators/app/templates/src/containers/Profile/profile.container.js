import React, { Component } from "react";
import { withWebId } from "@inrupt/solid-react-components";
import data from "@solid/query-ldflex";
import ProfileShape from "@contexts/profile-shape.json";
import { ProfileComponent } from "./profile.component";

const defaulProfilePhoto = "/img/icon/empty-profile.svg";

class Profile extends Component {
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
    this.fetchProfileShape();
  }
  changeFormMode = () => {
    this.setState({ formMode: !this.state.formMode });
  };
  fetchPhoto = async () => {
    const user = data[this.props.webId];
    let image = await user.image;

    if (!image) {
      image = await user["vcard:hasPhoto"];
    }

    this.setState({ photo: (image && image.value) || defaulProfilePhoto });
  };
  fetchProfileShape = async () => {
    const { profile } = ProfileShape;
    const user = data[this.props.webId];
    let node;

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

export default withWebId(Profile);
