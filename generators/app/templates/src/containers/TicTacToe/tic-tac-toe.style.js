import styled from 'styled-components';

export const GameStatus = styled.span`
  background: ${({ theme, status }) =>
    theme.tictactoe[status] ? theme.tictactoe[status] : '#00a69e'};
  font-size: 10px;
  letter-spacing: 2.4px;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  width: fit-content;
  padding: 0 10px;
  text-transform: uppercase;
`;

export const Section = styled.section`
  flex: 1 0 auto;
  background-image: url('/img/concentric-hex-pattern_2x.png');
  background-repeat: repeat;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
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
