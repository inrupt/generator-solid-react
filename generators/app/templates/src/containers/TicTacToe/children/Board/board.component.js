import React from 'react';
import styled from 'styled-components';
import { Field } from '../';

const GameBoard = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 0;
    width: 100%;
    flex: 1 0 auto;
`;

const Board = ({ squares, onMove, canPlay }) => {
    return (
        <GameBoard>
            {squares.map((square, i) => (
                <Field
                    key={i}
                    value={square}
                    onMove={() => onMove(i)}
                    canPlay={canPlay}
                />
            ))}
        </GameBoard>
    );
};

export default Board;
