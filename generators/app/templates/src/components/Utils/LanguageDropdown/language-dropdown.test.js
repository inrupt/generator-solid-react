import React from "react";
import { shallow } from "enzyme";
import Language from "./language-dropdown.component";

import "@testSetup";

const setup = () => shallow(<Language t={key => key} />);

describe("Language", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
