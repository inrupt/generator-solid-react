import React from 'react';
import ReactModal from 'react-modal';
import { render, cleanup } from 'react-testing-library';
import Board from './board.component';

describe.only('TicTacToe', () => {
  afterAll(cleanup);
  document.querySelectorAll = () => ['node'];
  ReactModal.setAppElement(document.createElement('div'));
  const { container } = render(<Board squares={[]} />);

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
