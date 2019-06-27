import styled from 'styled-components';

export const NotificationsWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 100%;

  & .notifications-enter {
    opacity: 0;
    transform: scale(0.8);
  }
  & .notifications-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
  }
  & .notifications-exit {
    opacity: 1;
  }
  & .notifications-exit-active {
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 300ms, transform 300ms;
  }
`;
