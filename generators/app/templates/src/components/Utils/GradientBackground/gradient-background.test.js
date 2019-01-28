import React from "react";
import { shallow, mount } from "enzyme";
import GradientBackground from "./gradient-background.component";

import "@testSetup";

const setup = () => shallow(<GradientBackground />);

describe("GradientBackground", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
