import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0 !important;
`;

export const DropdownMain = styled.button`
  position: relative;
  border: none;
  background: none;
  height: 100%;
  width: 100%;
  padding: 0 16px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }
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
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.25s ease-in-out;
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
