import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Notifications from './notifications.component';

afterAll(cleanup);

describe.only('Nav Bar', () => {
  const { container } = render(<Notifications />);

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
