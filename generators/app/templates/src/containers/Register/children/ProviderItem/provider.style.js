import styled from "styled-components";

export const ProviderItemStyle = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  border: solid 1.2px rgba(115, 127, 137, 1);
  height: 40px;
  margin-bottom: 20.5px;
  box-sizing: border-box;
  padding-left: 20px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  transition: all 0.2s ease-in;
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  border-radius: 4px;

  .checked {
    display: none;
  }

  &:hover {
    border-color: #5361fd;
    color: #5361fd;
  }

  &:last-child {
    margin-bottom: 0;
  }

  .img-group {
    display: flex;
    align-items: center;

    img {
      width: 32px;
      padding-right: 1em;
    }
  }
`;

export const Item = styled.li`
  list-style: none;
  padding: 10px 0;
  margin: 0;

  & input[type="radio"] {
    display: none;

    &:checked {
      + ${ProviderItemStyle} {
        border-color: #5361fd;
        color: #5361fd;

        .checked {
          display: block;
          color: green;
        }
      }
    }
  }
`;
