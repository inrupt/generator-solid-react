import styled from 'styled-components';

export const Item = styled.li`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  border: solid 1px #ccc;
  border-radius: 3px;
  padding: 4px 6px;
`;

export const GameStatus = styled.span`
  background: ${({ theme, status }) =>
  theme.tictactoe && theme.tictactoe[status] ? theme.tictactoe[status] : '#00a69e'};
  font-size: 10px;
  letter-spacing: 2.4px;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  width: fit-content;
  padding: 0 10px;
  text-transform: uppercase;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;

  & a {
    text-decoration: none;
    color: inherit;
    font-weight: 700;
    letter-spacing: 0.4px;
    font-size: 1.2em;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
