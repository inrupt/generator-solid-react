import styled from "styled-components";

import { media } from '../../../utils';

export const DropdownContainer = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  padding: 0 !important;
 
 
  .icon {
    margin-right: 5px;
    font-size: 1rem;
    color: #7C4DFF;
    ${media.desktop`display: none; path { display: none }`}
  }
`;

export const DropdownMain = styled.button`
  position: relative;
  border: none;
  background: none;
  width: 100%;
  padding: 0 16px;
  margin: 5px 0;
  display: flex;
  align-items: center;

  &:focus {
    outline: none;
  } 
  ${media.desktop`height: 100%;`}
`;

export const DropdownItemContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 2;
  ul {
    display: flex;
    position: relative;
    min-width: 200px;
    flex-direction: column;
    right: 0;
    height: auto;
    background: #fff;
    transition: all 0.25s ease-in-out;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }
  .profile-list & {
    position: relative;
    top: 0;
  }
`;

export const Item = styled.li`
  border-left: none;
  border-top: 1px solid rgba(8, 53, 117, 0.1);
  width: 100%;
  background: #fff;
  padding: 0;
  text-align: left;
  button {
    background: #fff;
    line-height: 2;
    padding: 1rem;
    text-align: left;
    cursor: pointer;
    width: 100%;
    border: none;
    border-radius: 0px;
    &:hover {
      background: linear-gradient(
        to right,
        rgba(124, 77, 255, 0.2) 0%,
        rgba(24, 169, 230, 0.2) 50%,
        rgba(1, 201, 234, 0.2) 100%
      );
      transition: all 0.5s ease-in-out;
      color: #083575;
    }
  }
  .flag-icon {
    margin-right: 10px;
  }
`;
