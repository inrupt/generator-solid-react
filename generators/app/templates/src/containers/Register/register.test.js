import React from "react";
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from "react-router-dom";
import { RegisterComponent } from "./register.component";


describe.only("Register", () => {

  afterAll(cleanup)

  const { container, getByTestId } = render(<Router>
    <RegisterComponent t={key => key} providers={[]} />
  </Router>);

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders with styled components", () => {
    expect(getByTestId('register-wrapper')).toBeTruthy();
    expect(getByTestId('panel-header')).toBeTruthy();
    expect(document.querySelector('.register-panel')).toBeTruthy();
    expect(document.querySelector('.panel-body')).toBeTruthy();
    expect(document.querySelector('.actions')).toBeTruthy();
  });

  test("renders title properly", () => {
    expect(
      getByTestId('title')
    ).toBeTruthy();
  });
});
