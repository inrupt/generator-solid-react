import React from "react";
import { Image, LogoutButton } from "@inrupt/solid-react-components";
import {
  WelcomeWrapper,
  WelcomeCard,
  WelcomeLogo,
  WelcomeProfile
} from "./welcome.style";

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
const WelcomePageContent = props => {
  return (
    <WelcomeWrapper>
      <WelcomeCard className="card">
        <WelcomeLogo>
          <img src="/img/logo.svg" alt="Inrupt" />
        </WelcomeLogo>
        <WelcomeProfile>
          <h3>Welcome to the Inrupt React SDK</h3>
          <div>
            {props.image && (
              <Image
                alt="User"
                src={props.image}
                defaultSrc="/img/empty-profile.svg"
              />
            )}
            <h2>{props.name}</h2>
          </div>
          <p>
            Not you? Sign in to another account <LogoutButton />
          </p>
        </WelcomeProfile>
      </WelcomeCard>
    </WelcomeWrapper>
  );
};

export default WelcomePageContent;
