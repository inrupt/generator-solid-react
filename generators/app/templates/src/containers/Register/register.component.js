import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { GradientBackground, CenterContainer } from "@util-components";
import {
  RegisterWrapper,
  RegisterPanel,
  PanelHeader,
  PanelBody,
  Actions
} from "./register.style";
import { ProviderItem } from "./children";

type Provider = {};

type Register = {
  provider: String
};

type Props = {
  providers: Array<Provider>,
  history: Object,
  t: Function
};

type State = {
  register: Register,
  canContinue: false
};

class RegisterComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      canContinue: false,
      register: {
        provider: ""
      }
    };
  }

  next = () => {
    const { canContinue } = this.state;
    if (canContinue) {
      window.location =
        this.state.register.provider +
        "?returnToUrl=" +
        window.location.protocol +
        "//" +
        window.location.host +
        "/register/success";
    }
  };

  selectProvider = e => {
    const { register } = this.state;
    this.setState({
      register: { ...register, provider: e.target.value },
      canContinue: true
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { canContinue } = this.state;
    console.log("Can Continue", canContinue);
    if (canContinue) {
      window.location =
        this.state.register.provider +
        "?returnToUrl=" +
        window.location.protocol +
        "//" +
        window.location.host +
        "/register/success";
    }
  };

  render() {
    const {
      canContinue,
      register: { provider }
    } = this.state;
    const { providers } = this.props;

    return (
      <GradientBackground>
        <CenterContainer>
          <RegisterWrapper>
            <h1>Hi! Welcome to Solid.</h1>
            <form onSubmit={this.onSubmit}>
              <RegisterPanel>
                <PanelHeader className="panel-header">
                  <h2>Select your Provider</h2>
                  <div className="progress-bar" />
                </PanelHeader>
                <PanelBody className="panel-body">
                  <Fragment>
                    <a
                      href="https://solid.inrupt.com/how-it-works"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      What is a provider, and how should I choose one?
                    </a>
                    <Link to="/login" className="a-with-spacing">
                      I already have a Solid identity
                    </Link>
                    <ul>
                      {providers.map((providerData, i) => (
                        <ProviderItem
                          data={providerData}
                          key={i}
                          onSelect={this.selectProvider}
                          radioName="providerRadio"
                          id={`radio-${i}`}
                          checked={providerData.registerLink === provider}
                        />
                      ))}
                    </ul>
                  </Fragment>
                </PanelBody>
                <Actions className="actions">
                  <button
                    className="btn-solid"
                    onClick={this.next}
                    type="submit"
                    disabled={!canContinue}
                  >
                    Next
                  </button>
                </Actions>
              </RegisterPanel>
            </form>
          </RegisterWrapper>
        </CenterContainer>
      </GradientBackground>
    );
  }
}

export default RegisterComponent;
