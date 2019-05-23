import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Board from './board.component';

describe.only('TicTacToe', () => {
    afterAll(cleanup);

    const { container } = render(<Board squares={[]} />);

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});
