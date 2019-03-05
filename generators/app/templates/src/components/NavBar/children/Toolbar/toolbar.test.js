import React from "react";
import { render, cleanup } from 'react-testing-library';
import Toolbar from "./toolbar.component";


afterAll(cleanup);

describe("Toolbar", () => {
  const { container, getByTestId } = render(<Toolbar
    toolbar={[
      { component: () => <label>Test</label>, label: "Test", id: "test" }
    ]}
  />);

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders 1 li", () => {
    expect(getByTestId('item').children.length).toBe(1);
  });
});
