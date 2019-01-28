import React from "react";
import { shallow, mount } from "enzyme";
import Dropdown from "./dropdown.component";

import "@testSetup";

const setup = () => shallow(<Dropdown />);

describe("Dropdown", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
