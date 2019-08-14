import styled from 'styled-components';

export const BellIcon = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 0;

  &:active,
  &:focus,
  &:hover,
  &.active {
    background: linear-gradient(
      to right,
      rgba(124, 77, 255, 0.25) 0%,
      rgba(83, 97, 253, 0.25) 51.88%,
      rgba(55, 203, 239, 0.25) 100%
    );
    outline: none;
  }

  .icon {
    width: 18px;
    height: 18px;
    position: relative;
  }
`;
