import React from "react";
import { shallow, mount } from "enzyme";
import NavBar from "./nav-bar.component";

import "@testSetup";

const setup = () => shallow(<NavBar />);
const setupMount = () => mount(<NavBar />);

describe("Nav Bar", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
