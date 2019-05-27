import React from 'react';
import { useWebId } from '@inrupt/solid-react-components';
import { Game } from './children';
import styled from 'styled-components';
import { useTicTacToe } from '@hooks';

const documentUri =
    'https://jpablo.solid.community/public/tictactoe/24052019434.ttl';

const TicTacToeSection = styled.section`
    flex: 1 0 auto;
    background-image: url('/img/concentric-hex-pattern_2x.png');
    background-repeat: repeat;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
`;
const TicTacToeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 80%;
    text-align: center;
`;

const Options = styled.div`
    display: flex;
    width: 100%;
    padding: 12px;
`;

const TicTacToe = () => {
    const webId = useWebId();
    const { gameData, createGame, onMove } = useTicTacToe(webId, documentUri);
    return (
        <TicTacToeSection>
            <TicTacToeWrapper>
                <h1>Tic Tac Toe Game</h1>
                <Game {...{gameData, onMove}}/>
                <Options><button onClick={createGame}>Create Game</button></Options>
            </TicTacToeWrapper>
        </TicTacToeSection>
    );
};

export default TicTacToe;
