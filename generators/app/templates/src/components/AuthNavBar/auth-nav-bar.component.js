import React from "react";
import { withTranslation } from "react-i18next";

import { NavBar } from "@components";

import { NavBarProfile } from "./children";

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
          component: () => <NavBarProfile {...props} />,
          label: "Profile",
          id: "profile"
        }
      ]}
    />
  );
};

export { AuthNavBar };
export default withTranslation()(AuthNavBar);
