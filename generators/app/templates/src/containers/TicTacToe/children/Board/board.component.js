import React from 'react';
import styled from 'styled-components';
import { Field } from '../';

const GameBoard = styled.div`
display: grid;
grid-template-columns: repeat(3,1fr);
grid-template-rows: repeat(3,1fr);
grid-gap: 0;
height: 100%;
width: 100%;
`

const Board = ({squares, onMove}) => {
    return (
        <GameBoard>
            {squares.map((square, i) => (
                <Field key={i} value={square} onMove={() => onMove(i)} />
            ))}
        </GameBoard>
    );
};

export default Board;
