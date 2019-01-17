import React, { Component } from "react";
import { GradientBackground, CenterContainer } from "@util-components";
import { NavBar } from "@components";

type Props = {
  history: Object
};

type State = {
  timeLeft: number
};
class RegistrationSuccess extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 15
    };
  }

  countDown = () => {
    const { timeLeft } = this.state;
    if (timeLeft === 0) this.redirect();
    this.setState({ timeLeft: this.state.timeLeft - 1 });
  };

  redirect = () => {
    clearInterval(this.interval);
    this.props.history.push("/login");
  };

  componentDidMount() {
    this.interval = setInterval(this.countDown, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { timeLeft } = this.state;
    return (
      <GradientBackground className="registration-success--page">
        <NavBar />
        <CenterContainer>
          <h1>Success! Welcome to the decentralized web.</h1>
          <img src="/img/rocket.svg" alt="rocket" className="rocket" />
          <span>
            We have emailed you more information about your new Solid Identity
          </span>
          <span>We will redirect you to your POD in {timeLeft} seconds...</span>
        </CenterContainer>
      </GradientBackground>
    );
  }
}

export default RegistrationSuccess;
