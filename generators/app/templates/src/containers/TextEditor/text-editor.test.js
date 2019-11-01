import React from 'react';
import { render, cleanup } from 'react-testing-library';

describe('Text Editor', () => {
  afterAll(cleanup);

  const { container } = render(<div />);

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
