import styled from 'styled-components';
import { media } from '../../utils';

export const GlobalErrorWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(1, minmax(200px, 1fr));
  grid-gap: 40px;
  max-width: 1024px;
  margin: 20px;

  ${media.tablet`grid-template-columns: repeat(2, 1fr);`}
  ${media.desktop`margin: 20px auto;`}
`;

export const ErrorTitle = styled.h1`
  color: #9C79D5;
  margin: 0;
`;

export const ErrorInfo = styled.h2`
  color: #5567F9;
  text-transform: uppercase;
  margin: 0;
  ${media.tablet`font-size: 2.8rem;`}
`;

export const ErrorDetail = styled.p`
  font-weight: 100;
  line-height: 1.8rem;

  &.subheadline {
    font-size: 1.1rem;
    &:after {
      display: block;
      content: "";
      height: 1px;
      width: 50%;
      margin: 20px 0 30px;
      background-color: #666666;
    }
  }
`;

export const ImageWrapper = styled.div`
  align-self: center;
  order: 2;

  img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
  }
  ${media.tablet`order: 1;`}
`;

export const DetailWrapper = styled.div`
  align-self: center;
  order: 1;

  ${media.tablet`order: 2;`}
`;
