import React from "react";
import { shallow, mount } from "enzyme";
import { ImageProfile } from "./image-profile.component";
import { ImageProfileLoader, ButtonStyled } from './image-profile.style';

import "@testSetup";

describe("Image Profile", () => {
  const setup = (props) => shallow(<ImageProfile {...props} />)

  it("should render without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });

  it("shouldn't render photo when not comes on props", () => {
    const wrapper = setup();
    expect(wrapper.find('img').length).toEqual(0);
  });

  it("should render Image Loader when file is in progress", () => {
    const wrapper = setup({ inProgress: true });
    expect(wrapper.find(ImageProfileLoader).length).toEqual(1);
  });

  it("shouldn't render Image Loader when file is not in progress", () => {
    const wrapper = setup({ inProgress: false });
    expect(wrapper.find(ImageProfileLoader).length).toEqual(0);
  });

  it("should have Upload Button", () => {
    const wrapper = setup({ inProgress: false });
    const button = wrapper.find(ButtonStyled);

    expect(button.length).toEqual(1);
  });
});
