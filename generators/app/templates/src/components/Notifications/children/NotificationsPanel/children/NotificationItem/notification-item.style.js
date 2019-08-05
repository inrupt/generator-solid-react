import styled from 'styled-components';

export const Item = styled.li`
  border-bottom: 2px solid rgb(227, 231, 237);
  cursor: pointer;
  position: relative;
  display: flex;
  padding: 12px;
  align-items: center;
  background: ${({ read }) => (read ? '#FFF' : 'rgb(245, 249, 254)')};
  position: relative;
  min-height: 60px;

  & > img {
    width: 40px;
    height: 40px;
  }

  .delete {
    display: none;
  }
  &:hover {
    .delete {
      display: block;
    }
  }
`;

export const Body = styled.div`
  padding: 0 14px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Message = styled.div`
  color: #374c5d;
  font-family: Raleway;
  font-size: 13px;
  line-height: 14px;
  & strong {
    font-weight: 700;
  }
`;

export const Meta = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 4px;
  & > .moment {
    color: #89969f;
    font-family: Raleway;
    font-size: 11px;
    font-weight: bold;
    line-height: 14px;
  }
`;

export const MarkAsRead = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  outline: none;
  border: none;
  position: absolute;
  right: 6px;
  top: 54%;
  transform: translateY(-50%);
  &:active {
    outline: none;
  }
`;

export const Delete = styled.button`
  position: absolute;
  top: 3px;
  right: 0;
  border: 0;
  padding: 0;
  margin: 5px 7px;
  color: #ffa600;
`;

export const Img = styled.img`
  max-width: 30px;
  border-radius: 60px;
  height: 30px;
`;
