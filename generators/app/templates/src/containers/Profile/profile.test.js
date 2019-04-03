import React from "react";
import { render, fireEvent, waitForElement } from 'react-testing-library';
import Profile from "./profile.container";
import auth from 'solid-auth-client';

const defaultWeb = "https://example.org/#me";

describe("Profile Container", () => {

  beforeAll(() => auth.mockWebId(defaultWeb));

  const { container } = render(<Profile toastManager={{ add: () => {} }}  />);

  it("should render without crashing", async () => {
    expect(container).toBeTruthy();
  });

  it("should show edit button by default", async () => {
    const editButton = await waitForElement(() =>
      document.querySelector('[data-testid="edit-profile-button"]'),
    )
    expect(editButton).toBeTruthy();
  });

  it("shouldn't show edit button on edit mode", async () => {
    const editButton = await waitForElement(() =>
      document.querySelector('[data-testid="edit-profile-button"]'),
    );

    fireEvent.click(editButton);

    const hideButton = document.querySelector('[data-testid="edit-profile-button"]');

    expect(hideButton).not.toBeTruthy();
  });

});

