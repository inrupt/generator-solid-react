import React, { useState, useEffect } from 'react';
import { Wrapper } from './game-accept.style';

const GameAccept = ({ sender }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const Accept = () => {
    console.log('Will accept game');
    setIsOpen(false);
  };

  return (
    <Wrapper>
      {sender} has invited you to play a game of TicTacToe. Would you like to play?
      <button type="button" onClick={Accept}>
        Accept
      </button>
      <button type="button">Decline</button>
    </Wrapper>
  );
};

export default GameAccept;
