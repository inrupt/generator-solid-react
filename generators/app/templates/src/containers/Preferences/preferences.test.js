import React from "react";
import { mount } from "enzyme";
import Preferences from "./preferences.component";
import "@testSetup";

describe.only("Preferences", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
        <Preferences />
    );
  });

  test("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });

});
