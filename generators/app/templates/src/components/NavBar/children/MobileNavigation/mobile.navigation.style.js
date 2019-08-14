import styled from 'styled-components';

export const TopNavigation = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin: 15.5px 0;

  div:first-child {
    grid-column: 1 / 3;
  }

  button {
    margin: 0;
  }

  .close-panel__toggle {
    text-align: right;
    padding-right: 20px;
  }
`;
