import styled from 'styled-components';

export const GameFormWrapper = styled.div`
  padding: 16px;
  margin-bottom: 12px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  text-align: left;
  & > h1 {
    margin: 0;
  }
  & > form {
    & .input-wrap > label {
      width: 100%;
      font-size: 0.9em;
    }
    & > span {
      font-weight: 700;
    }
`;

export const BtnDiv = styled.div`
  display: flex;
  & > button {
    margin: 0 12px 0 0;
  }
`;
