import React, { Component } from "react";
import styled from "styled-components";
import { Dropdown } from "@util-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import auth from "solid-auth-client";

export const Img = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: contain;
  display: ${({ show }) => (show ? "block" : "none")};
`;

class NavBarProfile extends Component {
  state = {
    imageLoaded: false
  };

  logout = async () => {
    try {
      await auth.logout();
      // Remove localStorage
      localStorage.removeItem("solid-auth-client");
      // Redirect to login page
      return true;
    } catch (error) {
      // console.log(`Error: ${error}`);
    }
  };
  onImageLoaded = async () => this.setState({ imageLoaded: true });
  logOut = async () => {
    try {
      await auth.logout();
      // Remove localStorage
      localStorage.removeItem("solid-auth-client");
      // Redirect to login page
      this.props.history.push("/login");
    } catch (error) {
      // console.log(`Error: ${error}`);
    }
  };
  render() {
    const { img } = this.props;
    const { imageLoaded } = this.state;

    const profileOpts = [
      {
        label: "Log Out",
        onClick: this.logOut
      }
    ];

    return img ? (
      <Dropdown actions={profileOpts} className="nav-bar--profile" hover={true}>
        <Img
          show={imageLoaded}
          src={img}
          alt="profile"
          onLoad={this.onImageLoaded}
        />
        {!imageLoaded && <FontAwesomeIcon icon="spinner" spin size="2x" />}
      </Dropdown>
    ) : (
      <div />
    );
  }
}

export default NavBarProfile;
