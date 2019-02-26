import React from "react";

import { storiesOf, setAddon } from "@storybook/react";
import JSXAddon from "storybook-addon-jsx";

import NavBar from "@components/NavBar";
import { AuthNavBarComponent } from "@components/AuthNavBar";

import "flag-icon-css/css/flag-icon.min.css";
import "@inrupt/inrupt-atomic-style-guide";
import "normalize.css";

setAddon(JSXAddon);

storiesOf("NavBar", module)
  .addWithJSX("no auth", () => <NavBar t={key => key} />)
  .addWithJSX("auth", () => <AuthNavBarComponent t={key => key} />);
