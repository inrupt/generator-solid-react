import React from 'react';
import styled from 'styled-components';

const Square = styled.button`
    border-radius: 0;
    border-color: green;
    font-size: 4rem;
    font-weight: 700;
    padding: 0;
    &:disabled{
        border-color: red;

        &:hover:disabled{
            border: solid 1px red;
            cursor: not-allowed;
        }
    }
`;

const Field = ({ value, onMove, canPlay }) => {
    return <Square onClick={onMove} disabled={!canPlay}>{value}</Square>;
};

export default Field;
