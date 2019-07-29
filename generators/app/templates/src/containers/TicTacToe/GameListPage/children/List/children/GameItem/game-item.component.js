import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Item, Info, GameStatus, Actions } from './game-item.style';

// moment.suppressDeprecationWarnings = true;

type Props = { game: Object };

const GameItem = ({ game }: Props) => {
  const status = game.status && game.status.toLowerCase().replace(' ', '');
  const { status: gameStatus, url, created, opponent } = game;
  return (
    <Item>
      <Info>
        {opponent && <a href={opponent.webId}>{opponent.name}</a>}
        <GameStatus status={status}>{gameStatus}</GameStatus>
      </Info>
      <Actions>
        <Link to={`tictactoe/${btoa(url)}`}>GO</Link>
        <span>{moment(created).fromNow()}</span>
      </Actions>
    </Item>
  );
};

export default GameItem;
