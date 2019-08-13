import styled from 'styled-components';

export const Item = styled.div`
  width: 100%;
  display: inline-block !important; // overriding the default card style
  padding: 7px 10px 7px 10px !important; // overriding the default card style
`;

export const GameCard = styled.div`
  display: flex;
  min-height: 72px;
  height: auto;
`;

export const GameStatus = styled.span`
  margin: 20px auto 0;
  letter-spacing: 0.4px;
  font-size: 1.2em;
  flex: 1 1 0;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  min-width: 120px;
  font-size: 2rem;
  justify-content: space-around;
  align-items: center;

  & > a {
    color: inherit;
    height: 50px;
    width: 50px;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 300ms ease-in;
    &:hover {
      background: rgba(130, 131, 139, 0.1);
    }
  }

  & > div {
    & > button {
      &.deleteBtn{
        font-size: 1.4rem;
        height: 50px;
        width: 50px;
        border: none;
        padding: 0;
        position: relative;
        background-color: #fff;
        color: rgba(237, 40, 40, 1);
        transition: all 300ms ease-in;
        &:hover {
          background: rgba(237, 40, 40, 0.1);
        }
      }

      &.deleteMode{
        width: fit-content;
        padding: .8em 1em;
        font-size: 1rem;
        color: #fff;
        background: rgba(237, 40, 40, 1);
        outline: none;
        border: none;
        transition: background 300ms ease-in;
        border-radius: 2px;
        display: flex;
        align-items: center;
        & > span {
          padding-left: 0.8em;
          font-size: 0.7rem;
        }
        &:hover{
          background: rgba(237, 40, 40, 0.9);
        }
      }
      
      &:hover{ 
        outline: none;
      }
    }
  }
}
`;

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  background-size: cover;
  overflow: hidden;
  visibility: visible;
  margin: 0 12px;
`;

export const ProfileName = styled.a`
  display: inline-block;
  vertical-align: middle;
  text-decoration: none;
  color: inherit;
  font-weight: 700;
  letter-spacing: 0.4px;
  font-size: 1.2em;
`;

export const ProfileItems = styled.div`
  flex: 1 1 0;
  flex-wrap: nowrap;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    & > div {
      display: flex;
      align-items: center;
      & > .createdDate {
        padding-left: 1.5em;
        color: #ccc;
        font-weight: 100;
        font-size: 0.9rem;
      }
    }
  }
`;
