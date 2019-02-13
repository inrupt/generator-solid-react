import React from "react";
import { shallow } from "enzyme";
import { GlobalError } from "./global-error.component";
import { ErrorTitle, ErrorInfo } from "./global-error.style";

import "../../utils/enzymeSetup";

describe("ErrorBoundary Component", () => {
  test("renders without crashing and render messages", () => {
    const wrapper = shallow(
      <GlobalError
        error="Error Message"
        info={{ componentStack: "Detail Error" }}
      />
    );

    expect(wrapper).toBeTruthy();

    const detail = wrapper.find(ErrorInfo).length;
    const title = wrapper.find(ErrorTitle).length;

    expect(detail).toEqual(1);
    expect(title).toEqual(1);
  });
});
