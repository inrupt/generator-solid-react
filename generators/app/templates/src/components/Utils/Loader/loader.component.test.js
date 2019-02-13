import React from "react";
import Loader from "./";
import { shallow } from "enzyme";

import "@testSetup";

it("renders without crashing", () => {
  const component = shallow(<Loader />);

  expect(component).toBeTruthy();
});
