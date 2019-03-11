import React from "react";
import { mount } from "enzyme";import { BrowserRouter as Router } from "react-router-dom";

import "@testSetup";
import Footer from "./footer.component";

describe.only("Footer", () => {
  let wrapper, wrapperWithNavigation, wrapperWithToolbar;
  beforeAll(() => {
    wrapper = mount(
      <Router>
        <Footer />
      </Router>
    );
  });
  it("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });
});
