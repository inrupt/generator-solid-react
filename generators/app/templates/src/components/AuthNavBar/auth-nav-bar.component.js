import React from "react";

import { NavBar } from "@components";

import { NavBarProfile } from "./children";

const navigation = [
  {
    id: "welcome",
    icon: "img/icon/apps.svg",
    label: "Welcome",
    to: "/welcome"
  }
];

const AuthNavBar = props => {
  return (
    <NavBar
      navigation={navigation}
      toolbar={[
        {
          component: () => <NavBarProfile {...props} />,
          label: "Profile",
          id: "profile"
        }
      ]}
    />
  );
};

export default AuthNavBar;
