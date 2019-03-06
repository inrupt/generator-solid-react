import React from "react";
import { render, cleanup } from 'react-testing-library';
import { PageNotFound } from "./page-not-found.component";
import { BrowserRouter as Router } from "react-router-dom";

describe("Page Not Found", () => {

  afterAll(cleanup);

  const { container } = render(<Router><PageNotFound t={key => key} /></Router>);

  test("App renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("includes link to homepage", () => {
    const idsLink = document.querySelector('.ids-link')

    expect(idsLink).toBeTruthy();
  });
});
