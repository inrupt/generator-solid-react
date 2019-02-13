import React from "react";
import { shallow } from "enzyme";
import Navigation from "./navigation.component";

import "@testSetup";

describe.only("Navigation", () => {
  let wrapper, navigation;
  beforeEach(() => {
    navigation = [
      {
        id: "welcome",
        icon: "img/icon/apps.svg",
        label: "Welcome",
        to: "/welcome"
      }
    ];
    wrapper = shallow(<Navigation navigation={navigation} />);
  });

  test("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });

  test("renders one navigation item", () => {
    const li = wrapper.find("li");
    expect(li.length).toEqual(1);
    expect(li.find("span.label").text()).toBe("Welcome");
  });
});
