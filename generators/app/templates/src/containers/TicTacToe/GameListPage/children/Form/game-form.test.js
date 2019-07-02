import React from 'react';
import { render, cleanup } from 'react-testing-library';
import GameForm from './game-form.component';

describe.only('Game Form', () => {
  afterAll(cleanup);

  const { container } = render(<GameForm webId="" />);

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
