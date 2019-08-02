import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  & > div#modal-actions {
    align-self: flex-end;
    padding: 16px 0 0 0;
    & button {
      margin-left: 8px;
    }
  }
`;

export const Actions = styled.div`
  padding: 2em 0;
  display: flex;
`;

export const Button = styled.button`
  flex: 1 0 auto;
  color: #fff;
  text-transform: uppercase;
  border: none;
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 0.7rem;
  padding: 0.7em 0;
`;

export const AcceptBtn = styled(Button)`
  background: rgb(44, 105, 164);
  margin-left: 1em;
`;

export const DeclineBtn = styled(Button)`
  background: rgb(239, 89, 80);
  margin-right: 1em;
`;
