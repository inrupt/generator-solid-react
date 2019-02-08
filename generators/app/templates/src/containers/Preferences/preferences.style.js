import styled from 'styled-components';

import { media } from '../../utils';

export const PreferencesContainer = styled.section`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  max-width: 900px;
  min-height: 580px;
  margin: 0 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url('/img/pattern-geo.png'),linear-gradient(
    135deg,
    #7c4dff 0%,
    #18a9e6 50%,
    #01c9ea 100%
  );
  background-repeat: repeat, no-repeat;
  box-sizing: border-box;
  padding: 20px 30px;

  h1{
      margin: 0;
      padding: 0;
      color: #fff;
      font-size: 1.5em;
      font-weight: 500;
  }

  button {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid white;
    color: white;
    font-size: 1rem;
  };
`;

export const Body = styled.div`
  padding: 40px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
`

export const Form = styled.form`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px 40px;
  ${media.tablet`
    grid-template-columns: 1fr 1fr;
  `}
`;
