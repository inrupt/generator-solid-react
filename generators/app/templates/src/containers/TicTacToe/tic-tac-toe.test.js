import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import TicTacToe from './tic-tac-toe.component';

describe.only('TicTacToe', () => {
    afterAll(cleanup);

    const { container } = render(
        <Router>
            <TicTacToe documentUri="adasd" />
        </Router>
    );

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});
