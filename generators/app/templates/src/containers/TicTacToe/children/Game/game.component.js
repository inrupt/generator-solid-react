import React, { Fragment } from 'react';
import styled from 'styled-components';
import Board from '../Board';
import moment from 'moment'

const GameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-items: flex-start;
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
    padding: 4px 16px 12px 16px;
`;

const Turn = ({ player }) => {
    return (
        <span>
            Next player: <b>{player}</b>
        </span>
    );
};

const Game = ({ gameData, onMove }) => {
    const { canPlay } = gameData;
    return (
        <GameWrapper>
            {gameData && (
                <Fragment>
                    <Metadata>
                        <Turn />
                        {!canPlay && (
                            <span>
                                Not your turn, please wait for your opponent to
                                play{' '}
                            </span>
                        )}
                        <span>
                            Game Status: <b>{gameData.gamestatus}</b>
                        </span>
                    </Metadata>
                    {gameData.moves && (
                        <Board
                            {...{
                                squares: gameData.moves,
                                onMove,
                                canPlay: gameData.canPlay,
                            }}
                        />
                    )}
                    {
                        gameData && <Metadata>
                             <span>Created: <b>{moment(gameData.createddatetime).format('MMM Do, YYYY')}</b></span>
                             {gameData.win && <span>Winner Combination: <b>{gameData.win.join('-')}</b></span>}
                            </Metadata>
                    }
                    
                </Fragment>
            )}
        </GameWrapper>
    );
};

export default Game;
