import React from "react";
import { mount } from "enzyme";
import CenterContainer from "./center-container.component";
import { CenterContainerWrapper } from "./center-container.style";

import "@testSetup";

describe.only("CenterContainer", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<CenterContainer />);
  });
  it("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });
  it("renders styled components", () => {
    expect(wrapper.find(CenterContainerWrapper)).toBeTruthy();
  });
  it("renders properly", () => {
    expect(wrapper.find("div.wrapper")).toBeTruthy();
  });
});
