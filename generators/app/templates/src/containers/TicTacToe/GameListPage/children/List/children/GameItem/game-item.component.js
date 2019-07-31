import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Item,
  ProfileName,
  GameStatus,
  Actions,
  GameCard,
  ProfileImage,
  ProfileItems
} from './game-item.style';

type Props = { game: Object, webId: String, deleteGame: Function };

const GameItem = ({ game, webId, deleteGame }: Props) => {
  const { status, url, created, opponent, actor } = game;
  return (
    <Item className="card item__span-4-columns">
      <GameCard>
        <ProfileDisplayItem player={opponent && opponent.webId !== webId ? opponent : actor} />
        <GameStatus>{status}</GameStatus>
        <Actions>
          <div>
            <button type="button" onClick={() => deleteGame(game)}>
              <FontAwesomeIcon icon="trash-alt" size="2x" />
            </button>
            {!game.deleted && (
              <Link to={`tictactoe/${btoa(url)}`}>
                <FontAwesomeIcon icon="play" size="2x" />
              </Link>
            )}
          </div>
          <span>{moment(created).fromNow()}</span>
        </Actions>
      </GameCard>
    </Item>
  );
};

const ProfileDisplayItem = ({ player }: { player: String }) => (
  <ProfileItems>
    {player && <ProfileImage target="_blank" src={player.image} alt="Opponent's profile" />}
    {player && <ProfileName href={player.webId}>{player.name}</ProfileName>}
  </ProfileItems>
);

export default GameItem;
