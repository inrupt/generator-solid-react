import React from 'react';
import styled from 'styled-components';
import { Field } from '..';

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 0;
  width: 100%;
  min-height: 200px;
  flex: 1 1 auto;
`;

type Props = { squares: Array, onMove: Funtion, canPlay: Boolean, result: Object };

const unique = seed => Date.now() + seed;

const borders = {
  0: ['bottom', 'right'],
  1: ['bottom'],
  2: ['bottom', 'left'],
  3: ['bottom', 'right'],
  4: ['bottom'],
  5: ['left', 'bottom'],
  6: ['right'],
  7: [],
  8: ['left']
};

const Board = ({ squares, onMove, canPlay, result }: Props) => (
  <GameBoard>
    {squares.map((square, i) => (
      <Field
        key={unique(i)}
        value={square}
        onMove={() => onMove(i)}
        canPlay={canPlay}
        result={result}
        index={i}
        borders={borders[i]}
      />
    ))}
  </GameBoard>
);

export default Board;
