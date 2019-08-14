import React from 'react';
import styled from 'styled-components';

const Square = styled.button`
  border-radius: 0;
  border-color: green;
  font-size: 4rem;
  font-weight: 700;
  padding: 0;
  border: none;
  background: #fff;
  ${({ borders }) => borders && borders.map(border => `border-${border}: solid 4px;`)}
  color: ${({ winner }) => (winner ? 'green' : '#000')};
  transition: border 500ms ease-out;
  &:hover {
    border-color: black;
  }
  &:disabled {
    border-color: red;
    &:hover:disabled {
      border-color: red;
      cursor: not-allowed;
    }
  }
`;

type Props = {
  value: String,
  onMove: Function,
  canPlay: Boolean,
  result: Object,
  index: Number,
  borders: Array<String>
};

const Field = ({ value, onMove, canPlay, result, index, borders }: Props) => {
  const winnerField = result && result.win ? result.combination.includes(index) : false;
  return (
    <Square onClick={onMove} disabled={!canPlay} winner={winnerField} borders={borders}>
      {value}
    </Square>
  );
};

export default Field;
