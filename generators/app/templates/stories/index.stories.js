import React from "react";

import { storiesOf, setAddon } from "@storybook/react";
import JSXAddon from "storybook-addon-jsx";

import NavBar from "@components/NavBar";
import { AuthNavBarComponent } from "@components/AuthNavBar";

import "@inrupt/inrupt-atomic-style-guide";

setAddon(JSXAddon);

storiesOf("NavBar", module)
  .addWithJSX("no auth", () => <NavBar t={key => key} />)
  .addWithJSX("auth", () => <AuthNavBarComponent t={key => key} />);
