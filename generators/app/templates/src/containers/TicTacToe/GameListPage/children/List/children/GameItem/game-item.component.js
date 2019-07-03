import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Item, Info, GameStatus, Actions } from './game-item.style';

type Props = { game: Object };

const GameItem = ({ game }: Props) => {
  const status = game.gamestatus && game.gamestatus.toLowerCase().replace(' ', '');
  const { gamestatus, url, createddatetime, opponent } = game;
  return (
    <Item>
      <Info>
        {opponent}
        <GameStatus status={status}>{gamestatus}</GameStatus>
      </Info>
      <Actions>
        <Link to={`tictactoe/${btoa(url)}`}>GO</Link>
        <span>{moment(createddatetime).fromNow()}</span>
      </Actions>
    </Item>
  );
};

export default GameItem;
