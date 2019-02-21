import React from "react";
import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import { ProviderLogin } from "@inrupt/solid-react-components";
import { LoginComponent } from "./login.component";
import {
  LoginWrapper,
  LoginPanel,
  PanelBody,
  LoginTitle
} from "./login.style.js";
import "../../i18n";
import "@testSetup";

describe.only("Login", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <LoginComponent t={key => key} />
      </Router>
    );
  });

  test("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });

  test("renders with styled components", () => {
    expect(wrapper.find(LoginWrapper)).toBeTruthy();
    expect(wrapper.find(LoginPanel)).toBeTruthy();
    expect(wrapper.find(PanelBody)).toBeTruthy();
    expect(wrapper.find(LoginTitle)).toBeTruthy();
  });
  test("renders title properly", () => {
    expect(wrapper.find("h1")).toBeTruthy();
  });

  test("renders ProviderLogin", () => {
    expect(wrapper.find(ProviderLogin)).toBeTruthy();
  });
});
