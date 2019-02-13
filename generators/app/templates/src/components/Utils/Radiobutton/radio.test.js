import React from "react";
import { shallow } from "enzyme";
import Radio from "./radio.component";

import "@testSetup";

const setup = () => shallow(<Radio />);

describe("Radio", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
