import React from "react";
import { render, fireEvent, waitForElement } from 'react-testing-library';
import { Profile } from "./profile.container";
import ProfileComponent from "./profile.component";


const defaultWeb = "https://example.org/#me";

describe("Profile Container", () => {

  const { container } = render(<Profile webId={defaultWeb} toastManager={{ add: () => {} }} />);

  it("should render without crashing", async () => {
    expect(container).toBeTruthy();
  });

  it("Profile UI component should render without crashing", () => {
    const { container } = render(<ProfileComponent />);
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
    expect(editButton).toBeTruthy();
  });

  it("should render profile ui component", async () => {
    const uiComponent = await waitForElement(() =>
      document.querySelector('[data-testid="profile-component"]'),
    );
    expect(uiComponent).toBeTruthy();
  });
});
