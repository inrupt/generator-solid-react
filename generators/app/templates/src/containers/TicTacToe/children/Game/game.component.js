import React, { useState } from 'react';
import styled from 'styled-components';
import Board from '../Board';

const GameWrapper = styled.div`
display: grid;
grid-template-columns: 1fr;
grid-template-rows: 50px 100%;
grid-gap: 16px;
justify-items: center;
align-items: center;
height: 100%;

`

const Turn = ({ player }) => {
    return (
        <span>
            Next player: <b>{player}</b>
        </span>
    );
};

const Game = props => {
    const [squares, setSquares] = useState(new Array(9).fill(null));
    const [players, setPlayers] = useState({ owner: null, opponent: null });
    const [nextPlayer, setNextPlayer] = useState("");

    return (
        <GameWrapper>
            <Turn player={nextPlayer} />
            <Board {...{ squares }} />
        </GameWrapper>
    );
};

export default Game;
