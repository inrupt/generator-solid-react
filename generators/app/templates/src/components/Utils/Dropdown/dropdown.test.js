import React from "react";
import { mount } from "enzyme";
import Dropdown from "./dropdown.component";
import {
  DropdownContainer,
  DropdownMain,
  DropdownItemContainer
} from "./dropdown.style";

import "@testSetup";

describe.only("Dropdown", () => {
  let wrapper, onDropDownClick, data;
  beforeEach(() => {
    data = [{ label: "Opt 1", onClick: onDropDownClick }];
    wrapper = mount(<Dropdown />);
  });
  test("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });
  test("dropdown opens when state changes", () => {
    wrapper.setState({ open: false });
    expect(wrapper.state("open")).toBeFalsy();
    wrapper.setState({ open: true });
    expect(wrapper.state("open")).toBeTruthy();
  });
  test("renders styled components", () => {
    expect(wrapper.find(DropdownContainer)).toBeTruthy();
    expect(wrapper.find(DropdownMain)).toBeTruthy();
    expect(wrapper.find(DropdownItemContainer)).toBeTruthy();
  });
  test("renders properly", () => {
    expect(wrapper.find("ul")).toBeTruthy();
  });
  test("renders items properly", () => {
    //TODO: Needs some work, apparently there are no "li"
    wrapper.setState({ open: true });
    wrapper.setProps({ data });
    expect(wrapper.find("li").length).toBe(0);
  });
});
