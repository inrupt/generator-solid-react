import React from "react";
import { shallow } from "enzyme";
import NavBarProfile from "./nav-bar-profile.component";

import "@testSetup";

const setup = () => shallow(<NavBarProfile />);

describe("NavBarProfile", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
