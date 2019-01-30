import React from "react";
import { shallow, mount } from "enzyme";
import Panel from "./panel.component";

import "@testSetup";

const setup = () => shallow(<Panel />);

describe("Panel", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
