import React from "react";
import styled from "styled-components";
import { Dropdown } from "@util-components";

export const Img = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: contain;
`;

const NavBarProfile = props => {
  const { img } = props;
  const profileOpts = [
    {
      label: "Log Out",
      onClick: async () => {
        console.log("Log Out");
        // await Auth.solidSignOut();
        // props.history.push("/login");
      },
      icon: "sign-out-alt"
    }
  ];
  const profilePic = img ? img : "/img/icon/empty-profile.svg";
  return (
    <Dropdown actions={profileOpts} className="nav-bar--profile">
      <Img src={profilePic} alt="profile" />
    </Dropdown>
  );
};

export default NavBarProfile;
