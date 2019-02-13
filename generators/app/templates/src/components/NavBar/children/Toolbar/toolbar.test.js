import React from "react";
import { shallow } from "enzyme";
import Toolbar from "./toolbar.component";

import "@testSetup";
// import { exec } from "child_process";

describe("Toolbar", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Toolbar
        toolbar={[
          { component: () => <label>Test</label>, label: "Test", id: "test" }
        ]}
      />
    );
  });
  test("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });
  test("renders 1 li", () => {
    expect(wrapper.find("li")).toHaveLength(1);
  });
});
