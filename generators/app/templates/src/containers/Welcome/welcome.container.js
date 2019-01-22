import React, { Component } from "react";
import WelcomePageContent from "./welcome.component";

/**
 * Container component for the Welcome Page, containing example of how to fetch data from a POD
 */
class WelcomeComponent extends Component<Props> {
  constructor(props) {
    super(props);

    this.getProfileData();
  }

  getProfileData() {
    return;
  }

  render() {
    return (
      <WelcomePageContent>
      </WelcomePageContent>
    )
  }
}

export default WelcomeComponent;
