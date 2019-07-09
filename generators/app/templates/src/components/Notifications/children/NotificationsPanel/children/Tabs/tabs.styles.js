import styled from 'styled-components';

export const TabsContainer = styled.ul`
  width: 100%;
  margin: 0 auto;
  padding: 0 auto;
  border-bottom: 1px solid #cfdce6;
`;

export const Tab = styled.li`
  display: inline-block;
  margin: 0 3px;
  button {
    padding: 10px;
    border-bottom: none;
    border-radius: 0;

    &.active {
      border-color: #5361fd;
      background: #5361fd;

      &:hover {
        color: white;
      }
    }

    &:hover {
      border-color: #5361fd;
      color: #5361fd;
    }
  }
`;
