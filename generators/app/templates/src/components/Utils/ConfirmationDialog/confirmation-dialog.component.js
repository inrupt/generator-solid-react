import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { Content, Actions, AcceptBtn, DeclineBtn } from './confirmation-dialog.style';

type Props = {
  onAccept: Function,
  onDecline: Function,
  options: Object,
  parentSelector?: String
};

/**
 * Check if we are running test to avoid issue with React Modal
 */
if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

const ConfirmationDialog = ({ onAccept, onDecline, options, parentSelector }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { message, messageComponent: MessageComponent, acceptText, declineText } = options;

  const Accept = async () => {
    await onAccept();
    setIsOpen(false);
  };

  const Decline = async () => {
    await onDecline();
    setIsOpen(false);
  };

  const getParent = () => document.querySelector(parentSelector);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      parentSelector={getParent}
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <Content>
        <div>{MessageComponent ? <MessageComponent /> : message}</div>
        <Actions>
          <DeclineBtn type="button" onClick={Decline} data-testid="declineButton">
            {declineText || 'Decline'}
          </DeclineBtn>
          <AcceptBtn type="button" onClick={Accept} data-testid="acceptButton">
            {acceptText || 'Accept'}
          </AcceptBtn>
        </Actions>
      </Content>
    </ReactModal>
  );
};

ConfirmationDialog.defaultProps = {
  parentSelector: '#root'
};

export default ConfirmationDialog;
