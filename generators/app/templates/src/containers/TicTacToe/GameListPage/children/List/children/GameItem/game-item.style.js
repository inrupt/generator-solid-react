import styled from 'styled-components';

export const Item = styled.div`
  width: 100%;
  display: inline-block !important; // overriding the default card style
  padding: 7px 10px 7px 10px !important; // overriding the default card style
`;

export const GameCard = styled.div`
  display: flex;
  min-height: 72px;
  height: auto;
`;

export const GameStatus = styled.span`
  margin: 20px auto 0;
  letter-spacing: 0.4px;
  font-size: 1.2em;
  flex: 1 1 0;
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

  a {
    color: inherit;
  }

  svg {
    display: inline-block;
    margin: 10px;
  }

  & button {
    border: none;
    margin: 0;
    padding: 0;
  }
`;

export const ProfileImage = styled.img`
  width: 75px;
  display: inline-block;
  vertical-align: middle;
`;

export const ProfileName = styled.a`
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
  text-decoration: none;
  color: inherit;
  font-weight: 700;
  letter-spacing: 0.4px;
  font-size: 1.2em;
`;

export const ProfileItems = styled.div`
  flex: 1 1 0;
  flex-wrap: nowrap;
`;
