import React from 'react';
import { render } from 'react-testing-library';
import GameList from './list.component';

const webId = 'https://example.com/#me';
const gamePath = 'https://example.com/game';

describe('List Game', () => {
  const { container } = render(<GameList {...{ webId, gamePath }} />);

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
