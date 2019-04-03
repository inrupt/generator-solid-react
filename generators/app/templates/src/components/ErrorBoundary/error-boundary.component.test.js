import React from "react";
import { render, cleanup } from 'react-testing-library';
import ErrorBoundary from "./error-boundary.component";

import 'jest-dom/extend-expect';

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

afterAll(cleanup);

describe("ErrorBoundary Component", () => {
  test("caches error and display messages", () => {
    shallowErrors(() => {
      const { container } = render(
        <ErrorBoundary component={() => <h2>Error Message</h2>}>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(container).toHaveTextContent("Error Message");
    });
  });
});
