import React from "react";
import { render, cleanup } from 'react-testing-library';
import Radio from "./radio.component";

afterAll(cleanup);

const { container } =  render(<Radio />);

describe("Radio", () => {
  it("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});
