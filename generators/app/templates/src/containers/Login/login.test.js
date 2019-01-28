import React from "react";
import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import { ProviderLogin } from "@inrupt/solid-react-components";
import Login from "./login.component";
import {
  LoginWrapper,
  LoginPanel,
  PanelBody,
  LoginTitle
} from "./login.style.js";
import "@testSetup";

describe.only("Login", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <Login />
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
    expect(
      wrapper.containsMatchingElement(<h1>Hi! Welcome to Solid.</h1>)
    ).toBeTruthy();
  });

  test("renders ProviderLogin", () => {
    expect(wrapper.find(ProviderLogin)).toBeTruthy();
  });
});
