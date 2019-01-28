import React from "react";
import { shallow, mount } from "enzyme";
import CenterContainer from "./center-container.component";

import "@testSetup";

const setup = () => shallow(<CenterContainer />);

describe("CenterContainer", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
