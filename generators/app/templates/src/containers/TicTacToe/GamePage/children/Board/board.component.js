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

type Props = { squares: Array, onMove: Funtion, canPlay: Boolean };

const unique = seed => Date.now() + seed;

const Board = ({ squares, onMove, canPlay, winner }: Props) => (
  <GameBoard>
    {squares.map((square, i) => (
      <Field
        key={unique(i)}
        value={square}
        onMove={() => onMove(i)}
        canPlay={canPlay}
        winner={winner}
        index={i}
      />
    ))}
  </GameBoard>
);

export default Board;
