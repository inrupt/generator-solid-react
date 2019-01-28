import React from "react";
import { shallow, mount } from "enzyme";
import RegistrationSuccess from "./registration-success.component";

import "@testSetup";

const setup = () => shallow(<RegistrationSuccess />);

describe("RegistrationSuccess", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
