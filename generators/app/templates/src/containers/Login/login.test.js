import React from "react";
import { shallow, mount } from "enzyme";
import Login from "./login.component";

import "@testSetup";

const setup = () => shallow(<Login />);

describe("Login", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
