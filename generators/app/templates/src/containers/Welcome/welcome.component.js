import React from "react";
import { WelcomeWrapper, WelcomeCard, WelcomeLogo, WelcomeProfile } from './welcome.style';

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * @param props
 */
const WelcomePageContent = props => {
  return (<WelcomeWrapper>
    <WelcomeCard className="card">
      <WelcomeLogo>
        <img src="/img/logo.svg" />
      </WelcomeLogo>
      <WelcomeProfile>
        <h3>Welcome to the Inrupt React SDK</h3>
        <div>
          <img></img>
          <h2>DARION HART</h2>
        </div>
        <p>
          Not you? Sign in to another account
        </p>
      </WelcomeProfile>
    </WelcomeCard>
  </WelcomeWrapper>)
};

export default WelcomePageContent;

