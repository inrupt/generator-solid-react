import styled from 'styled-components';

/**
 * A styled-component for the 404 Page layout
 */
export const PageNotFoundWrapper = styled.section`
    display: flex;
    flex-direction: row-reverse;
    background-image: url('/img/spaceman.svg');
    background-repeat: no-repeat;
    background-position-x: -125px;
    background-position-y: 100px;
    height: 100%;
    
    @media only screen and (max-width: 900px) {
      background-image: url('/img/spaceman-mobile.svg');
      background-position: left -80px bottom -10px;
      background-size: 70%;
    }
`;

/**
 * A styled-component for the 404 Page content section
 */
export const PageNotFoundContent = styled.div`
  max-width: 54%;
  margin: 100px 40px 0 50px;
  
  
  @media only screen and (max-width: 900px) {
    max-width: 100%;
    margin: 20px 40px;
    text-align: center;
  }
  
  @media only screen and (max-width: 600px) {
    img {
      width: 100%;
    }
  }
`;
