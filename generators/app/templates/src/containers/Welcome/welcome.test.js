import React from "react";
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from "react-router-dom";
import { WelcomePageContent } from "./welcome.component";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import "../../i18n";


library.add(fas);

describe.only("Welcome", () => {
  afterAll(cleanup);

  const { container, getByTestId } = render( <Router>
    <WelcomePageContent providers={[]} t={key => key} />
  </Router>);

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders with styled components", () => {
    expect(getByTestId('welcome-wrapper')).toBeTruthy();
    expect(getByTestId('welcome-logo')).toBeTruthy();
    expect(getByTestId('welcome-profile')).toBeTruthy();
    expect(getByTestId('welcome-detail')).toBeTruthy();
    expect(document.querySelector('.card')).toBeTruthy();
  });
});
