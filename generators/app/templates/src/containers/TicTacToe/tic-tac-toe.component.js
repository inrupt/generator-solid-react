import React, { useState, useEffect, useCallback } from 'react';
import { useWebId, LiveUpdate, useNotification } from '@inrupt/solid-react-components';
import styled from 'styled-components';
import { ldflexHelper, buildPathFromWebId, errorToaster } from '@utils';
import { Game, GameForm } from './children';

const TicTacToeSection = styled.section`
  flex: 1 0 auto;
  background-image: url('/img/concentric-hex-pattern_2x.png');
  background-repeat: repeat;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;
const TicTacToeWrapper = styled.div`
  & > h1 {
    margin-top: 0;
  }
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 80%;
  text-align: center;
  padding: 20px 0;
`;

const TicTacToe = () => {
  const webId = useWebId();
  const [formData, setFormData] = useState({});
  const [opponent, setOpponent] = useState('https://jairo88.inrupt.net/profile/card#me');
  const inboxUrl = buildPathFromWebId(webId, process.env.REACT_APP_TICTAC_INBOX);
  const { createNotification, createInbox } = useNotification(inboxUrl, webId);

  const sendNotification = useCallback(async content => {
    try {
      /**
       * Opponent app inbox
       */
      const opponentAppInbox = buildPathFromWebId(opponent, process.env.REACT_APP_TICTAC_INBOX);
      /**
       * Check if app inbox exist to send notification if doesn't exist
       * send try to send to global inbox.
       */
      const appInbox = await ldflexHelper.existFolder(opponentAppInbox);
      if (appInbox) {
        return createNotification(content, opponentAppInbox);
      }
      const globalOpponentInbox = await ldflexHelper.discoveryInbox(opponent);
      if (globalOpponentInbox) {
        return createNotification(content, `${globalOpponentInbox}/`);
      }

      /**
       * If the opponent doesn't has inbox we show an error
       */
      errorToaster('Error the opponent does not has inbox to send notification', 'Warning');
    } catch (error) {
      errorToaster(error.message, 'Error');
    }
  }, []);

  useEffect(() => {
    ldflexHelper.createContainer(process.env.REACT_APP_TICTAC_PATH);
  }, []);

  useEffect(() => {
    if (webId) {
      createInbox();
    }
  }, [webId]);

  const onCreateGame = (documentUri: String, opponent: String) => {
    setFormData({ documentUri, opponent });
  };

  return (
    <TicTacToeSection>
      <TicTacToeWrapper>
        {webId && (
          <GameForm
            {...{
              webId,
              onCreateGame,
              sendNotification,
              setOpponent,
              opponent
            }}
          />
        )}

        {formData && formData.documentUri && (
          <LiveUpdate subscribe={formData.documentUri}>
            <Game {...{ ...formData, webId, sendNotification }} />
          </LiveUpdate>
        )}
      </TicTacToeWrapper>
    </TicTacToeSection>
  );
};

export default TicTacToe;
