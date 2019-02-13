import React from "react";
import { shallow } from "enzyme";
import { Profile } from "./profile.container";
import ProfileComponent from "./profile.component";

import "@testSetup";

const defaultWeb = "https://example.org/#me";

describe("Profile Container", () => {
  const setup = () =>
    shallow(<Profile webId={defaultWeb} toastManager={{ add: () => {} }} />);

  it("should render without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });

  it("Profile UI component should render without crashing", () => {
    const wrapper = shallow(<ProfileComponent />).dive();
    expect(wrapper).toBeTruthy();
  });

  describe("ComponentDidMount", () => {
    const wrapper = setup();
    it("edit mode should be disable", () => {
      expect(wrapper.state().formMode).toEqual(true);
    });

    it("should call fetch ProfileShape and ProfilePhoto methods", async () => {
      const mockFetchProfile = jest.fn();
      const mockFetchPhoto = jest.fn();

      wrapper.instance().fetchProfile = mockFetchProfile;
      wrapper.instance().fetchPhoto = mockFetchPhoto;

      wrapper.instance().componentDidMount();
      wrapper.update();

      await expect(mockFetchPhoto).toHaveBeenCalled();
      await expect(mockFetchProfile).toHaveBeenCalled();
    });
  });

  describe("Should render Profile Component", () => {
    const wrapper = setup();
    it("render profile ui component", () => {
      const uiComponent = wrapper.find(ProfileComponent);
      expect(uiComponent.length).toEqual(1);
    });
  });
});
