import styled from 'styled-components';
import { media } from '@utils';

export const Panel = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 340px;
  min-height: 320px;
  background: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);
  top: calc(100% + 2px);
  right: -210px;
  z-index: 99999;
  border: solid 1px #cfdce6;

  ${media.tablet`
    right: 0;
    min-width: 351px;
  `}
`;

export const Title = styled.h2`
  padding: 16px;
  margin: 0;
  text-transform: uppercase;
  color: #5361fd;
  font-family: Raleway;
  font-size: 14px;
  letter-spacing: 1.2px;
  line-height: 14px;
  flex: 0 0 50px;
  box-sizing: border-box;
`;
