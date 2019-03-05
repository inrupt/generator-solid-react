import styled from "styled-components";
import { GradientBackground, Panel } from "@util-components";

export const LoginWrapper = styled(GradientBackground)`
  h1 {
    color: #ffffff;
  }
`;

export const LoginPanel = styled(Panel)``;

export const PanelBody = styled.div`
  display: grid;
  flex-direction: column;
  
  .provider-login-component {
    div[role=option] {
      text-align: left !important;
      padding-left: 20px;
    }
  }
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
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    width: 32%;
    content: "";
    background: #656e75;
    height: 1px;
    box-sizing: border-box;
    top: 50%;
  }

  span {
    padding: 0 5px;
  }

  &::before {
    right: 0;
  }

  &::after {
    left: 0;
  }
`;
