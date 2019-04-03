import React from "react";
import { render, cleanup } from 'react-testing-library';
import NavBarProfile from "./nav-bar-profile.component";

afterAll(cleanup);

const { container } = render(<NavBarProfile t={key => key} />);

describe("NavBarProfile", () => {
  it("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});
