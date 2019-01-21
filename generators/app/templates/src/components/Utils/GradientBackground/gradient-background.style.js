import styled from "styled-components";

export const Gradient = styled.div.attrs({
  className: "swatch--primary-gradient"
})`
  height: 100%;
  width: 100%;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/img/background-pattern.svg");
    filter: opacity(30%);
  }
`;
