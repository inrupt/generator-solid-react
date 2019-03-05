import React from "react";
import { render, cleanup } from 'react-testing-library';
import Navigation from "./navigation.component";
import { BrowserRouter as Router } from "react-router-dom";

import 'jest-dom/extend-expect';


afterAll(cleanup);

describe.only("Navigation", () => {

  const navigation = [
    {
      id: "welcome",
      icon: "img/icon/apps.svg",
      label: "Welcome",
      to: "/welcome"
    }
  ];

  const { container, getByTestId } = render(<Router><Navigation navigation={navigation} /></Router>);


  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders one navigation item", () => {
    const item = getByTestId('item');

    expect(item.children.length).toBe(1);
    expect(item).toHaveTextContent("Welcome");
  });
});
