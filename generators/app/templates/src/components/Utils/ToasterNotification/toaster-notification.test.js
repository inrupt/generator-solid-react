import React from "react";
import { shallow } from "enzyme";
import ToasterNotification from "./toaster-notification.component";

import "@testSetup";

const setup = props => shallow(<ToasterNotification {...props} />);

describe("Toaster Notification Component", () => {
  it("Toaster Notification renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeTruthy();
  });

  it("render title and message when children prop comes", () => {
    const wrapper = setup({ children: ["Error", "Message"] });
    const title = wrapper.find(".content__title").length;
    const message = wrapper.find(".content__message").length;

    expect(title).toEqual(1);
    expect(message).toEqual(1);
  });
});
