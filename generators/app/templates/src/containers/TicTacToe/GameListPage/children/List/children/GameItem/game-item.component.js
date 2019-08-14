import React, { useState, useRef } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { useOnClickOutside } from '@hooks';
import { Labeled } from '@util-components';
import {
  Item,
  ProfileName,
  Actions,
  GameCard,
  ProfileImage,
  ProfileItems
} from './game-item.style';

type Props = { game: Object, webId: String, deleteGame: Function };

const GameItem = ({ game, webId, deleteGame }: Props) => {
  const { status, created, opponent, actor, url } = game;
  const { t } = useTranslation();
  return (
    <Item className="card item__span-4-columns">
      <GameCard>
        <ProfileDisplayItem
          player={opponent && opponent.webId !== webId ? opponent : actor}
          status={status}
          created={created}
        />
        <Actions>
          <DeleteGame deleteGame={deleteGame} game={game} />
          <Labeled
            to={`tictactoe/${btoa(url)}`}
            className="playBtn"
            label={t('game.playLabel')}
            component={Link}
          >
            <FontAwesomeIcon icon="play" color="rgb(130, 131, 139)" />
          </Labeled>
        </Actions>
      </GameCard>
    </Item>
  );
};

const DeleteGame = ({ game, deleteGame }: { game: Object, deleteGame: Function }) => {
  const ref = useRef();
  const [deleteMode, setDeleteMode] = useState(false);
  const { t } = useTranslation();
  useOnClickOutside(ref, () => setDeleteMode(false));

  return (
    <div ref={ref}>
      {deleteMode ? (
        <button type="button" className="deleteMode" onClick={() => deleteGame(game)}>
          <FontAwesomeIcon icon="trash-alt" color="#ffffff" />
          <span>{t('game.confirmDelete')}</span>
        </button>
      ) : (
        <Labeled
          type="button"
          label={t('game.deleteLabel')}
          className="deleteBtn"
          onClick={() => setDeleteMode(true)}
        >
          <FontAwesomeIcon icon="trash-alt" color="rgb(237, 40, 40)" />
        </Labeled>
      )}
    </div>
  );
};

const ProfileDisplayItem = ({
  player,
  status,
  created
}: {
  player: String,
  status: String,
  created: String
}) => (
  <ProfileItems>
    {player && <ProfileImage target="_blank" src={player.image} alt="Opponent's profile" />}
    <div>
      {player && <ProfileName href={player.webId}>{player.name}</ProfileName>}
      <div>
        {status && <span>{status}</span>}
        {created && <span className="createdDate">{moment(created).fromNow()}</span>}
      </div>
    </div>
  </ProfileItems>
);

export default GameItem;
