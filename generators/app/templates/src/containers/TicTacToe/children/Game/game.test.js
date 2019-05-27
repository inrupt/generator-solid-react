import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Game from './game.component';

describe.only('TicTacToe', () => {
    afterAll(cleanup);

    const { container } = render(<Game gameData={{}}  />);

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});
