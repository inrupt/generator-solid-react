import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';

const Content = styled.div`
  display: flex;
  flex-direction: column;

  & > div#modal-actions {
    align-self: flex-end;
    padding: 16px 0 0 0;
    & button {
      margin-left: 8px;
    }
  }
`;
/**
 * Check if we are running test to avoid issue with React Modal
 */
if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

type Props = { actor: Object, onAccept: Function, onDecline: Function };

const GameAccept = ({ actor, onAccept, onDecline }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const Accept = () => onAccept(() => setIsOpen(false));

  const Decline = () => onDecline(() => setIsOpen(false));

  const getParent = () => document.querySelector('#gamepage');

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      parentSelector={getParent}
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <Content>
        <span>
          <b>{actor && actor.name}</b> has invited you to play a game of TicTacToe. Would you like
          to play?
        </span>
        <div id="modal-actions">
          <button type="button" onClick={Accept}>
            Accept
          </button>
          <button type="button" onClick={Decline}>
            Decline
          </button>
        </div>
      </Content>
    </ReactModal>
  );
};

export default GameAccept;
