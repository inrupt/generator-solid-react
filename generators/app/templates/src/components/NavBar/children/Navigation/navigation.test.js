import React from "react";
import { shallow, mount } from "enzyme";
import Navigation from "./navigation.component";

import "@testSetup";

const setup = () => shallow(<Navigation />);
const setupMount = () => mount(<Navigation />);

describe("Navigation", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
