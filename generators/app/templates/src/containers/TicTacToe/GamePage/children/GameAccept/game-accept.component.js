import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';
import { ConfirmationDialog } from '@util-components';

const MessageWrapper = styled.div`
  text-align: center;
  max-width: 400px;
  font-size: 1.2rem;
  word-wrap: break-word;
  overflow: hidden;
  & p {
    padding-bottom: 1em;
    font-size: 1.2rem;
    position: relative;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
  }
  & strong {
    font-weight: 700;
  }

  & span {
    font-size: 1.2rem;
  }
`;

type Props = { actor: Object, onAccept: Function, onDecline: Function };

const GameAccept = ({ actor, onAccept, onDecline }: Props) => {
  const { t } = useTranslation();
  const name = actor && actor.name;

  const messageComponent = () => (
    <MessageWrapper>
      <img src="/img/tic-tac-toe-color.svg" alt="Tic Tac Toe Board" width="200px" height="200px" />
      <Trans i18nKey="game.invitationTemplate" values={{ name }}>
        <Fragment>
          <p>
            <strong>{name}</strong> has invited you to play a game of Tic Tac Toe.
          </p>
          <span>Would you like to Play?</span>
        </Fragment>
      </Trans>
    </MessageWrapper>
  );

  return (
    <ConfirmationDialog
      onAccept={onAccept}
      onDecline={onDecline}
      options={{
        messageComponent: () => messageComponent(),
        acceptText: t('game.invitationAcceptText'),
        declineText: t('game.invitationDeclineText')
      }}
      parentSelector="#gamepage"
    />
  );
};

export default GameAccept;
