import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import GameForm from './game-form.component';

const sendNotification = jest.fn();
const webId = 'https://example.com/#me';

const setup = async () => {
  const { container, getByTestId } = render(
    <GameForm
      {...{
        webId,
        sendNotification,
        inboxes: [{ path: 'https://example.com/inbox', name: 'Global' }]
      }}
    />
  );

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  const submitButton = getByTestId('form-submit');

  await fireEvent.click(submitButton);

  test('should call sendNotification after submit', () => {
    expect(sendNotification).toHaveBeenCalledTimes(1);
  });

  test('should have input file name and input webId', () => {
    const inputFile = getByTestId('uri-input');
    const inputWebid = getByTestId('webId');
    expect(inputFile).toBeTruthy();
    expect(inputWebid).toBeTruthy();
  });
};

describe('Game Form', () => {
  afterAll(cleanup);

  setup();
});
