import React from "react";
import { render, cleanup } from 'react-testing-library';
import { FormUi } from "./form.component.ui";


describe("Profile Container", () => {

  it("Form UI should render without crashing", async () => {
    const { container } = render(<FormUi toastManager={{ add: () => {} }} />);
    expect(container).toBeTruthy();
  });

  afterAll(cleanup);

});
