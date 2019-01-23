import React from "react";
import { shallow, mount } from "enzyme";
import AuthNavBar from "./auth-nav-bar.component";

import "@testSetup";

const setup = () => shallow(<AuthNavBar />);
const setupMount = () => mount(<AuthNavBar />);

describe("AuthNavBar", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
