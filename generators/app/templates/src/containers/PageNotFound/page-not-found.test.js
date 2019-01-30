import React from "react";
import { shallow } from "enzyme";
import PageNotFound from "./page-not-found.component";
import { Link } from "react-router-dom";
import "../../utils/enzymeSetup";

describe("Page Not Found", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PageNotFound />);
  });

  test("App renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });

  test("includes link to homepage", () => {
    expect(wrapper.find(Link)).toHaveLength(1);
  });
});
