import React from "react";
import { shallow, mount } from "enzyme";
import Register from "./register.component";

import "@testSetup";

const setup = () => shallow(<Register providers={[]} />);

describe("Register", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
