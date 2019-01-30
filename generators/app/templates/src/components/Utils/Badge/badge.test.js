import React from "react";
import { mount } from "enzyme";
import Badge from "./badge.component";
import { BadgeWrapper } from "./badge.style";

import "@testSetup";

describe.only("Badge", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<Badge badge={2} />);
  });
  it("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });
  it("renders styled components", () => {
    expect(wrapper.find(BadgeWrapper)).toBeTruthy();
  });
  it("renders properly", () => {
    expect(wrapper.find(BadgeWrapper).text()).toEqual("2");
  });
});
