import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Field from './field.component';

describe.only('TicTacToe', () => {
  afterAll(cleanup);

  const { container } = render(<Field />);

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
