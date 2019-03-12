import styled from "styled-components";

import { media } from "../../utils";

export const ProfileWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("/img/concentric-hex-pattern_2x.png");
  background-repeat: repeat;
  min-height: 79vh;
  padding: 60px 0;
`;
export const ProfileContainer = styled.div`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  max-width: 900px;
  margin: 0 20px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  ${media.tablet`
    height: 90%;
  `}
`;

export const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-image: url("/img/pattern-geo.png"),
    linear-gradient(135deg, #7c4dff 0%, #18a9e6 50%, #01c9ea 100%);
  background-repeat: repeat, no-repeat;
  padding: 30px 20px;

  .edit-button {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid white;
    color: white;
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 1rem;
  }
`;

export const Form = styled.form`
  padding: 20px 40px;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px 40px;
  ${media.tablet`
    grid-template-columns: 1fr 1fr;
  `}
`;

export const Button = styled.button`
  max-width: 128px !important;
  display: inline-block !important;

  &:first-child {
    margin-right: 10px;
  }
`;

export const FullGridSize = styled.div`
  grid-column: span 1;
  text-align: right;
  ${media.tablet`
    grid-column: span 2;
  `}
`;

export const WebId = styled.div`
  padding: 20px 40px;

  &:before {
    background-color: #d8d8d8;
    display: block;
    content: "";
    height: 1px;
    width: 100%;
    margin-bottom: 25px;
  }

  a {
    display: inline-block;
    word-break: break-all;
    margin-left: 10px;
  }
`;
