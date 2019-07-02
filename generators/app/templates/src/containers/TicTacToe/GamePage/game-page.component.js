import React, { useCallback } from 'react';
import { useWebId, LiveUpdate } from '@inrupt/solid-react-components';
import { Game } from './children';
import { Section, Wrapper } from '../tic-tac-toe.style';

const GamePage = ({ match }) => {
  const webId = useWebId();
  const { gameId } = match.params;
  const gameURL = atob(gameId);

  const isGameUrlValid = useCallback(() => {
    try {
      const url = new URL(gameURL);
      return url !== undefined;
    } catch (e) {
      return false;
    }
  }, [webId]);

  return (
    <Section>
      <Wrapper>
        {isGameUrlValid() && webId && (
          <LiveUpdate subscribe={gameURL}>
            <Game {...{ gameURL, webId }} />
          </LiveUpdate>
        )}
      </Wrapper>
    </Section>
  );
};

export default GamePage;
