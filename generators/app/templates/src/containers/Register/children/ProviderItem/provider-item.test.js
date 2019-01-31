import React from "react";
import { mount } from "enzyme";
import ProviderItem from "./provider.item.component";
import { Item, ProviderItemStyle } from "./provider.style";

import "@testSetup";

describe("ProviderItem", () => {
  let wrapper;
  beforeEach(() => {
    let data = {
      label: "Inrupt",
      image: "/img/inrupt.svg",
      value: "https://inrupt.net/auth",
      registerLink: "https://inrupt.net/register",
      description: "Lorem ipsum dolor sit amet non ipsom dolor"
    };
    wrapper = mount(<ProviderItem data={data} />);
  });
  test("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });
  test("renders with styled components", () => {
    expect(wrapper.find(Item)).toBeTruthy();
    expect(wrapper.find(ProviderItemStyle)).toBeTruthy();
  });

  test("rendering item properly", () => {
    expect(wrapper.find("span").text()).toBe("Inrupt");
  });
});
