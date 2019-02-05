import React, { Component } from "react";
import styled from "styled-components";
import { Dropdown } from "@util-components";
import { LogoutButton } from "@inrupt/solid-react-components";

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
  onImageLoaded = async () => this.setState({ imageLoaded: true });
  logOut = () => {
    this.props.history.push("/login");
  };
  render() {
    const { img } = this.props;
    const { imageLoaded } = this.state;

    const profileOpts = [
      {
        label: "Log Out",
        onClick: this.logOut,
        icon: "sign-out-alt"
      }
    ];
    const profilePic = img ? img : "/img/icon/empty-profile.svg";
    console.log(this.props);

    return (
      <Dropdown actions={profileOpts} className="nav-bar--profile">
        <Img
          show={imageLoaded}
          src={profilePic}
          alt="profile"
          onLoad={this.onImageLoaded}
        />
      </Dropdown>
    );
  }
}

export default NavBarProfile;
