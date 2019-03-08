import React from "react";

import { render, cleanup } from 'react-testing-library';
import ToasterNotification from "./toaster-notification.component";

afterAll(cleanup);

const { container } = render(<ToasterNotification children={["Error", "Message"]} />);

describe("Toaster Notification Component", () => {
  it("Toaster Notification renders without crashing", () => {
    expect(container).toBeTruthy();
  });

  it("render title and message when children prop comes", () => {
    const title = document.querySelector('.content__title');
    const message = document.querySelector('.content__message');

    expect(title).toBeTruthy();
    expect(message).toBeTruthy();
  });
});
