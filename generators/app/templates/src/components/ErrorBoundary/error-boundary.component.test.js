import React from "react";
import { mount } from "enzyme";
import ErrorBoundary from "./error-boundary.component";

import "../../utils/enzymeSetup";

const ErrorComponent = () => {
  throw Error("Error");
};

// This a hack to avoid error console when we run test
const shallowErrors = codeRun => {
  const error = console.error;

  console.error = () => {};

  codeRun();

  console.error = error;
};

describe("ErrorBoundary Component", () => {
  test("caches error and display messages", () => {
    shallowErrors(() => {
      const wrapper = mount(
        <ErrorBoundary component={() => <h2>Error Message</h2>}>
          <ErrorComponent />
        </ErrorBoundary>
      );

      const message = wrapper.text();

      expect(message).toEqual("Error Message");
    });
  });
});
