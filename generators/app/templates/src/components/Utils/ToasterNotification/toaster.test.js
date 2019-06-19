/* eslint-disable react/no-children-prop */
import React from 'react';

import { render, cleanup } from 'react-testing-library';
import Toaster from './toaster.component';

afterAll(cleanup);

const defaultTitle = 'error';

const defaultContent = 'Something happened';

const { container, getByText } = render(<Toaster title={defaultTitle} content={defaultContent} />);

describe('Toaster Notification Component', () => {
  it('Toaster Notification renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  it('render title', () => {
    expect(getByText(defaultTitle).textContent).toBe(defaultTitle);
  });

  it('render content', () => {
    expect(getByText(defaultContent).textContent).toBe(defaultContent);
  });
});
