import React from "react";
import { mount } from "enzyme";
import NavBar from "./nav-bar.component";
import { Navigation, Toolbar } from "./children";
import { BrowserRouter as Router } from "react-router-dom";

import "@testSetup";

describe.only("Nav Bar", () => {
  let wrapper, wrapperWithNavigation, wrapperWithToolbar;
  beforeAll(() => {
    wrapper = mount(
      <Router>
        <NavBar />
      </Router>
    );
    wrapperWithNavigation = mount(
      <Router>
        <NavBar navigation={[]} />
      </Router>
    );
    wrapperWithToolbar = mount(
      <Router>
        <NavBar toolbar={[]} />
      </Router>
    );
  });
  it("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });
  it("renders with Navigation", () => {
    expect(wrapperWithNavigation.find(Navigation)).toBeTruthy();
  });
  it("renders with Toolbar", () => {
    expect(wrapperWithToolbar.find(Toolbar)).toBeTruthy();
  });
});
