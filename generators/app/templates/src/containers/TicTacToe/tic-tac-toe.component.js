import React from 'react';
import { Game } from './children';
import styled from 'styled-components';
const TicTacToeSection = styled.section`
    height: calc(100%);
    width: 100%;
`;

const TicTacToe = () => {
    return (
        <TicTacToeSection>
            <h1>Tic Tac Toe Games</h1>
            <Game />
        </TicTacToeSection>
    );
};

export default TicTacToe;
