import React from "react";
import { shallow, mount } from "enzyme";
import Badge from "./badge.component";

import "@testSetup";

const setup = () => shallow(<Badge />);

describe("Badge", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
