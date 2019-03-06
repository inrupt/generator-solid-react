import React from "react";
import { NavBar } from "@components";

import { NavBarProfile } from "./children";
import { LanguageDropdown } from "@util-components";

const AuthNavBar = props => {
  const { t } = props;
  const navigation = [
    {
      id: "welcome",
      icon: "img/icon/apps.svg",
      label: t("navBar.welcome"),
      to: "/welcome"
    }
  ];
  return (
    <NavBar
      navigation={navigation}
      toolbar={[
        {
          component: () => <LanguageDropdown {...props} />,
          id: "language"
        },
        {
          component: () => <NavBarProfile {...props} />,
          id: "profile"
        }
      ]}
    />
  );
};

export default AuthNavBar;
