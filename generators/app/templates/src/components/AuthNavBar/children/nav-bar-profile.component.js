import React, { Component } from "react";
import styled from "styled-components";
import { Dropdown } from "@util-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import auth from "solid-auth-client";

export const ImageContainer = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-size: cover;
  overflow: hidden;
  display: ${({ show }) => (show ? "block" : "none")};
  img{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
`;

class NavBarProfile extends Component {
  state = {
    imageLoaded: false
  };

  profileRedirect = () => this.props.history.push("/profile");
  
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
      label: "Profile",
      onClick: this.profileRedirect
      },
      {
        label: "Log Out",
        onClick: this.logOut
      }
    ];

    return img ? (
      <Dropdown actions={profileOpts} className="nav-bar--profile" hover={true}>
      <ImageContainer show={imageLoaded}>
        <img 
          src={img}
          alt="profile"
          onLoad={this.onImageLoaded}/>
      </ImageContainer>
        {!imageLoaded && <FontAwesomeIcon icon="spinner" spin size="2x" />}
      </Dropdown>
    ) : (
      <div />
    );
  }
}

export default NavBarProfile;
