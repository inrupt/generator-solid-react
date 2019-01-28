import React from "react";
import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import Welcome from "./welcome.component";
import {
  WelcomeWrapper,
  WelcomeCard,
  WelcomeLogo,
  WelcomeProfile,
  WelcomeDetail
} from "./welcome.style";
import "@testSetup";

describe.only("Welcome", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <Welcome providers={[]} />
      </Router>
    );
  });

  test("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });

  test("renders with styled components", () => {
    expect(wrapper.find(WelcomeWrapper)).toBeTruthy();
    expect(wrapper.find(WelcomeCard)).toBeTruthy();
    expect(wrapper.find(WelcomeLogo)).toBeTruthy();
    expect(wrapper.find(WelcomeProfile)).toBeTruthy();
    expect(wrapper.find(WelcomeDetail)).toBeTruthy();
  });
});
