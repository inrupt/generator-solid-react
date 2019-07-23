import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import GameAccept from './game-accept.component';

const props = {
  actor: 'https://example.com/#me',
  onAccept: jest.fn(),
  onDecline: jest.fn()
};

type Props = {
  children: any
};

const WrapperComponent = ({ children }: Props) => <div id="gamepage">{children}</div>;

describe('TicTacToe Game', () => {
  afterAll(cleanup);

  const { container, getByTestId } = render(
    <WrapperComponent>
      <GameAccept {...{ ...props }} />
    </WrapperComponent>
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('accept and decline should be called one time', () => {
    fireEvent.click(getByTestId('acceptButton'));
    fireEvent.click(getByTestId('declineButton'));
    expect(props.onAccept).toHaveBeenCalledTimes(1);
    expect(props.onDecline).toHaveBeenCalledTimes(1);
  });
});
