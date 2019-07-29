import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Item, ProfileName, GameStatus, Actions, GameCard, ProfileImage, ProfileItems } from './game-item.style';

type Props = { game: Object };

const GameItem = ({ game, webId }: Props) => {
  const status = game.gamestatus && game.gamestatus.toLowerCase().replace(' ', '');
  const { gamestatus, url, createddatetime, opponent, actor } = game;

  console.log(webId);
  return (
    <Item className="card item__span-4-columns">
      <GameCard>
        <ProfileDisplayItem player={opponent && opponent.webId !== webId ? opponent : actor} />
        <GameStatus>
          {gamestatus}
        </GameStatus>
        <Actions>
          <div>
            <FontAwesomeIcon icon='trash-alt' size='2x' />
            <Link to={`tictactoe/${btoa(url)}`}>
              <FontAwesomeIcon icon='play' size='2x' />
            </Link>
          </div>
          <span>{moment(createddatetime).fromNow()}</span>
        </Actions>
      </GameCard>
    </Item>

  );
};

const ProfileDisplayItem = ({player}) => {
  console.log(player);
  return (
    <ProfileItems>
      {player && <ProfileImage target="_blank" src={player.image} alt="Opponent's profile" />}
      {player && <ProfileName href={player.webId}>{player.name}</ProfileName>}
    </ProfileItems>
  )
}

export default GameItem;


