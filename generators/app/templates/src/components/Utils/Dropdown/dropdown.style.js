import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
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
  .dropdown-items-container {
    position: absolute;
    border: solid 1px #ccc;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);
    top: calc(100% + 5px);
    right: 8px;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;

      li {
        padding: 0;
        margin: 0;
        box-sizing: border-box;

        button {
          padding: 0.9em 1em;
          background: none;
          border: none;
          background-color: #ffffff;

          width: 120px;
          display: flex;
          color: #083575;
          font-size: 12px;
          line-height: 11px;
          text-align: center;
          border-bottom: solid 1px #ccc;

          &::last-child {
            border-bottom: none;
          }

          &:hover {
            background: #083575;
            color: #ffffff;
          }

          & > span {
            padding: 0 12px;
          }
        }
      }
    }
  }
`;
