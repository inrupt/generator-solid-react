import React from "react";
import { shallow, mount } from "enzyme";
import Welcome from "./welcome.component";

import "@testSetup";

const setup = () => shallow(<Welcome />);

describe("Welcome", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
