import React, { useEffect, useState } from 'react';
import { LiveUpdate } from '@inrupt/solid-react-components';
import { Redirect } from 'react-router-dom';
import { ldflexHelper } from '@utils';
import { Game } from './children';
import { Section, Wrapper } from '../tic-tac-toe.style';

const GamePage = ({ match, webId, history }) => {
  const { gameId } = match.params;
  const gameURL = atob(gameId);
  const [wasChecked, setWasChecked] = useState(false);
  /* Checks if the game url is a valid url or not */
  const isGameUrlValid = async () => {
    try {
      const url = new URL(gameURL);
      const document = await ldflexHelper.documentExists(gameURL);
      const isOk = url && document.status !== 404;
      if (!isOk) history.push('/404');
      setWasChecked(isOk);
    } catch (e) {
      history.push('/404');
    }
  };

  useEffect(() => {
    if (webId) isGameUrlValid();
  }, [webId, match]);

  return (
    <Section id="gamepage">
      <Wrapper>
        {webId && wasChecked && (
          <LiveUpdate subscribe={gameURL}>
            <Game {...{ gameURL, webId }} />
          </LiveUpdate>
        )}
      </Wrapper>
    </Section>
  );
};

export default GamePage;
