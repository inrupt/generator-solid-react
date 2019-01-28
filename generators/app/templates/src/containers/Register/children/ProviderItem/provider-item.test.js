import React from "react";
import { shallow, mount } from "enzyme";
import ProviderTest from "./provider.item.component";

import "@testSetup";

const setup = () => shallow(<ProviderTest data={{}} />);

describe("ProviderTest", () => {
  it("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });
});
