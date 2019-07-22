import React from 'react';
import { render, waitForElement, cleanup } from 'react-testing-library';
import GameListPage from './game-list-page.component';

const webId = 'https://example.com/#me';

describe('Register', () => {
  const { getByTestId, container } = render(<GameListPage {...{ webId }} />);

  test('should render form and list after create inbox', async () => {
    expect(getByTestId('game-form')).not.toBe(null);

    await waitForElement(() => getByTestId('game-list'));

    expect(getByTestId('game-list')).not.toBe(null);

    afterEach(cleanup);
  });

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
