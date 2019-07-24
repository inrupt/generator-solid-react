import styled from 'styled-components';

export const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  flex: 1 0 auto;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
`;

export const Metadata = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 4px 16px 12px 16px;
  & a {
    text-decoration: none;
    padding: 0 4px;
  }
`;
