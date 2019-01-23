import React from "react";
import { shallow, mount } from "enzyme";
import Toolbar from "./toolbar.component";

import "@testSetup";

const setup = () => shallow(<Toolbar />);
const setupMount = () => mount(<Toolbar />);

describe("Toolbar", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
