import React from "react";
import styled from "styled-components";

export const Img = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: contain;
`;

const NavBarProfile = ({ img }) => {
  return <Img src={img || "img/icon/empty-profile.svg"} alt="profile" />;
};

export default NavBarProfile;
