import React, { Fragment, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import {
  Item,
  ProfileName,
  GameStatus,
  Actions,
  GameCard,
  ProfileImage,
  ProfileItems,
  DeleteAction
} from './game-item.style';

type Props = { game: Object, webId: String, deleteGame: Function };

const GameItem = ({ game, webId, deleteGame }: Props) => {
  const { status, created, opponent, actor } = game;
  return (
    <Item className="card item__span-4-columns">
      <GameCard>
        <ProfileDisplayItem player={opponent && opponent.webId !== webId ? opponent : actor} />
        <GameStatus>{status}</GameStatus>
        <Actions>
          <GameActions {...{ game, deleteGame }} />
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

const GameActions = ({ game, deleteGame }: { game: Object, deleteGame: Function }) => {
  const [deleteMode, setDeleteMode] = useState(false);
  const { url } = game;
  const { t } = useTranslation();
  return (
    <div>
      {!deleteMode ? (
        <Fragment>
          <button type="button" onClick={() => setDeleteMode(true)}>
            <FontAwesomeIcon icon="trash-alt" size="2x" color="rgb(239, 89, 80)" />
          </button>
          {!game.deleted && (
            <Link to={`tictactoe/${btoa(url)}`}>
              <FontAwesomeIcon icon="play" size="2x" color="rgb(44, 105, 164)" />
            </Link>
          )}
        </Fragment>
      ) : (
        <DeleteAction>
          <span> {t('game.deleteConfirmation')}</span>
          <div>
            <button type="button" onClick={() => deleteGame(game)}>
              <FontAwesomeIcon icon="check" size="2x" color="rgb(44, 105, 164)" />
            </button>
            <button type="button" onClick={() => setDeleteMode(false)}>
              <FontAwesomeIcon icon="times" size="2x" color="rgb(239, 89, 80)" />
            </button>
          </div>
        </DeleteAction>
      )}
    </div>
  );
};

export default GameItem;
