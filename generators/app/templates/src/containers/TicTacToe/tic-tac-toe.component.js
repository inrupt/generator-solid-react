import React, { useState } from 'react';
import { useWebId, LiveUpdate } from '@inrupt/solid-react-components';
import { Game, GameForm } from './children';
import styled from 'styled-components';

const TicTacToeSection = styled.section`
    flex: 1 0 auto;
    background-image: url('/img/concentric-hex-pattern_2x.png');
    background-repeat: repeat;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
`;
const TicTacToeWrapper = styled.div`
    & > h1 {
        margin-top: 0;
    }
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 80%;
    text-align: center;
    padding: 20px 0;
`;

const TicTacToe = ({location}) => {
    const webId = useWebId();
    const [formData, setFormData] = useState({});

    const onCreateGame = (documentUri: String, opponent: String) => {
        setFormData({ documentUri, opponent });
    };

    return (
        <TicTacToeSection>
            <TicTacToeWrapper>
                <h1>Tic Tac Toe Game</h1>
                <GameForm
                    {...{
                        onCreateGame,
                    }}
                />
                {formData && formData.documentUri && (
                    <LiveUpdate subscribe={formData.documentUri}>
                        <Game {...{ ...formData, webId }} />
                    </LiveUpdate>
                )}
            </TicTacToeWrapper>
        </TicTacToeSection>
    );
};

export default TicTacToe;
