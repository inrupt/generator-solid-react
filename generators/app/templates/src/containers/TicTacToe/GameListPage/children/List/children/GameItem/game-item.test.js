import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-testing-library';
import GameItem from './game-item.component';

const game = {
  status: 'finished',
  url: 'https://example.com/#me',
  created: '2018-01-20',
  opponent: 'https://example.com/#me'
};

describe('GameItem', () => {
  const { container } = render(
    <Router>
      <GameItem {...{ game }} />
    </Router>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
