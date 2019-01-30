import React from "react";
import { mount } from "enzyme";
import RegistrationSuccess from "./registration-success.component";
import { RegistrationPage } from "./registration-success.style";

import "@testSetup";

describe("RegistrationSuccess", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<RegistrationSuccess />);
  });
  test("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });
  test("renders with styled components", () => {
    expect(wrapper.find(RegistrationPage)).toBeTruthy();
  });

  test("renders title properly", () => {
    expect(
      wrapper.containsMatchingElement(
        <h1>Success! Welcome to the decentralized web.</h1>
      )
    ).toBeTruthy();
  });

  test("rendering item properly", () => {
    expect(wrapper.find("img").hasClass("rocket")).toBeTruthy();
  });
});
