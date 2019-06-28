import React, { useState, useEffect } from 'react';
import { useWebId, LiveUpdate, useNotification } from '@inrupt/solid-react-components';
import styled from 'styled-components';
import { ldflexHelper } from '@utils';
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
  const { createNotification } = useNotification(process.env.REACT_APP_TICTAC_INBOX, webId);

  useEffect(() => {
    ldflexHelper.createContainer(process.env.REACT_APP_TICTAC_PATH);
  }, []);

  const onCreateGame = (documentUri: String, opponent: String) => {
    setFormData({ documentUri, opponent });
  };

  console.log(formData.documentUri);

  return (
    <TicTacToeSection>
      <TicTacToeWrapper>
        {webId && (
          <GameForm
            {...{
              webId,
              onCreateGame,
              createNotification
            }}
          />
        )}

        {formData && formData.documentUri && (
          <LiveUpdate subscribe={formData.documentUri}>
            <Game {...{ ...formData, webId }} />
          </LiveUpdate>
        )}
      </TicTacToeWrapper>
    </TicTacToeSection>
  );
};

export default TicTacToe;
