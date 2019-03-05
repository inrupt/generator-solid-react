import React from "react";
import { render, cleanup } from 'react-testing-library';
import { ImageProfile } from "./image-profile.component";


describe("Image Profile", () => {
  afterAll(cleanup);
  const { container, rerender } = render(<ImageProfile />)

  it("should render without crashing", () => {
    expect(container).toBeTruthy();
  });

  it("should render Image Loader when file is in progress", () => {
    rerender(<ImageProfile inProgress={true} />);

    expect(document.querySelector('.image-profile-loader')).toBeTruthy();
  });

  it("shouldn't render Image Loader when file is not in progress", () => {
    rerender(<ImageProfile inProgress={false} />);

    expect(document.querySelector('.image-profile-loader')).toEqual(null);
  });

  it("should have Upload Button", () => {
    expect(document.querySelector('.button-upload')).toBeTruthy();
  });
});
