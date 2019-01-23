/* eslint-disable constructor-super */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ProviderLogin } from "@inrupt/solid-react-components";
import {
  LoginWrapper,
  LoginPanel,
  PanelBody,
  LoginTitle
} from "./login.style.js";
import { CenterContainer, Loader } from "@util-components";

type Props = { history: Object };

type State = {
  idp: String,
  loading: Boolean
};
export default class LoginComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      idp: "",
      loading: false,
      withWebId: false
    };
  }

  render() {
    const { loading } = this.state;
    return (
      <LoginWrapper>
        <CenterContainer>
          <h1>Hi! Welcome to Solid.</h1>
          <LoginPanel>
            <PanelBody>
              <Link
                className="ids-link-filled ids-link-filled--primary"
                to="/register"
              >
                Register for a solid identity
              </Link>
              <a
                href="https://solid.inrupt.com/get-a-solid-pod"
                rel="noopener noreferrer"
                target="_blank"
                className="link"
              >
                What is a Solid Identity??
              </a>
              <LoginTitle> Log in</LoginTitle>
              <ProviderLogin
                callbackUri={`${window.location.origin}/welcome`}
              />
            </PanelBody>
          </LoginPanel>
        </CenterContainer>
        <Loader show={loading} />
      </LoginWrapper>
    );
  }
}
