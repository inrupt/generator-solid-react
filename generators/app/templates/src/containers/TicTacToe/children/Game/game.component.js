import React, { Fragment } from 'react';
import styled from 'styled-components';
import Board from '../Board';

const GameWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 30px auto;
    grid-gap: 16px;
    justify-items: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    flex: 0 0 75%;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
`;

const Metadata = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px;
`;

const Turn = ({ player }) => {
    return (
        <span>
            Next player: <b>{player}</b>
        </span>
    );
};

const Game = ({ gameData, onMove }) => {
    return (
        <GameWrapper>
            {gameData && (
                <Fragment>
                    <Metadata>
                        <Turn />
                        <span>Game Status: <b>{gameData.gamestatus}</b></span>
                    </Metadata>
                    {gameData.moves && (
                        <Board {...{ squares: gameData.moves, onMove }} />
                    )}
                </Fragment>
            )}
        </GameWrapper>
    );
};

export default Game;
