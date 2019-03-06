import React from "react";
import { render, cleanup } from 'react-testing-library';
import AuthNavBar from "./auth-nav-bar.component";
import { BrowserRouter as Router } from "react-router-dom";

describe.only("AuthNavBar", () => {
  afterAll(cleanup);

  const { container } = render(<Router>
    <AuthNavBar t={key => key} />
  </Router>);

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});
