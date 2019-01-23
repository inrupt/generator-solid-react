import styled from "styled-components";
import { GradientBackground, Panel } from "@util-components";
import { Link } from "react-router-dom";

export const LoginWrapper = styled(GradientBackground)`
  h1 {
    color: #ffffff;
  }
`;

export const LoginPanel = styled(Panel)``;

export const PanelBody = styled.div`
  display: grid;
  flex-direction: column;
`;

export const LoginTitle = styled.span`
  color: #656e75;
  font-family: Raleway;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1.2px;
  line-height: 19px;
  text-align: center;
  position: relative;
  margin: 30px 0;
  display: inline-block;
  width: 100%;

  &::before,
  &::after {
    width: 37%;
    content: "";
    background: #656e75;
    height: 1px;
    position: absolute;
    box-sizing: border-box;
    top: 50%;
  }

  &::before {
    right: 0;
  }

  &::after {
    left: 0;
  }
`;

export const RegisterButton = styled(Link)`
  height: 40px;
  width: 100%;
  border-radius: 4px;
  background-color: #7c4dff;
  color: #ffffff;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.07px;
  line-height: 16px;
  display: block;
  margin: 0 0 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  &:hover {
    filter: opacity(95%);
    text-decoration: none;
    cursor: pointer;
  }
`;
