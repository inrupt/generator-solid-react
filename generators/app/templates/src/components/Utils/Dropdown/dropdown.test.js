import React from "react";
import { render, cleanup } from 'react-testing-library';
import Dropdown from "./dropdown.component";


afterAll(cleanup);

describe.only("Dropdown", () => {
  const { container, rerender, getByTestId } = render(<Dropdown  className={'dropDownContainer'}/>);
  const data = [{ label: "Opt 1", onClick: () =>{} }];

  test("renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  test("renders styled components", () => {
    expect(document.querySelector('.dropDownContainer')).toBeTruthy();
    expect(getByTestId('dropdownMain')).toBeTruthy();
  });

});
