import styled from 'styled-components';

export const WelcomeWrapper = styled.section`
  height: 100%;
  width: 100%;
  background-image: url('/img/concentric-hex-pattern_2x.png');
  background-repeat: repeat;
  padding-top: 50px;
`;

export const WelcomeCard = styled.div`
  background-color: #fff;
  margin: 0 auto;

  //Overriding the style guide card flexbox settings
  max-width: 80% !important;
  flex-direction: row !important;
  padding: 40px 0 !important; //temporary fix to a style guide bug

  align-items: center;
`;

export const WelcomeLogo = styled.div`
  width: 50%;
  height: 100%;

  img {
    width: 60%;
    display: block;
    margin: 0 auto;
  }
`;

export const WelcomeProfile = styled.div`
  width: 50%;
  height: 100%;
  text-align: center;

  img {
    max-width: 120px;
  }
`;
