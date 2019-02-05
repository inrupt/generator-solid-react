import styled from "styled-components";

export const ToasterWrapper = styled.section`
  min-width: 310px;
  &.error {
    background-color: rgba(213, 0, 0, 1);

    &:hover {
      background-color: rgba(213, 0, 0, 0.8);
    }
  };
  &.warning {
    background-color: rgba(255, 234, 0, 1);

    &:hover {
      background-color: rgba(213, 0, 0, 0.8);
    }
  };
`;
