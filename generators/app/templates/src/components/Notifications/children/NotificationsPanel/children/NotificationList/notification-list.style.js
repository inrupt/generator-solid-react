import styled from 'styled-components';

export const List = styled.ul`
  overflow-y: auto;
  max-height: 350px;
  flex: 1 1 auto;
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  height: 100%;
`;

export const NoNotifications = styled.span`
  display: inherit;
  margin: 20px;
  text-align: center;
`;
