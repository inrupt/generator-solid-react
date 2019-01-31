import styled from 'styled-components';

export const InputWrapper = styled.div`
  align-items: center;
  display:grid;
  grid-template-columns: 16px 94%;
  grid-gap: 10px;

  input:read-only {
    border: none;
    &:focus {
      outline: none;
    }
  }
`;
