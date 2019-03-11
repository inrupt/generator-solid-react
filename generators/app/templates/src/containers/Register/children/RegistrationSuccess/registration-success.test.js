import React from "react";
import { render, cleanup } from 'react-testing-library';
import RegistrationSuccess from "./registration-success.component";

import 'jest-dom/extend-expect';

describe("RegistrationSuccess", () => {
  afterAll(cleanup);

  const { container } = render(<RegistrationSuccess />);

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
  test("renders with styled components", () => {
    const registrationPage = document.querySelector('.registration-success--page');
    expect(registrationPage).toBeTruthy();
  });

  test("renders title properly", () => {
    expect(container).toBeInTheDocument('<h1>Success! Welcome to the decentralized web.</h1>');
  });

  test("rendering item properly", () => {
    const image = document.querySelector('.rocket');
    expect(image).toBeTruthy();
  });
});
