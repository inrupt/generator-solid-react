/* eslint-disable constructor-super */
import React, { Component } from "react";
import { Redirect } from "react-router";
import { ProviderLogin } from "@inrupt/solid-react-components";
import {
  LoginWrapper,
  LoginPanel,
  PanelBody,
  RegisterButton,
  LoginTitle
} from "./login.style.js";
import { CenterContainer, Loader } from "@util-components";

type Props = { t: Function, i18n: any };

type State = {
  idp: String,
  loading: Boolean,
  withWebId: Boolean,
  history: Object
};
export default class LoginComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      idp: "",
      loading: false,
      withWebId: false,
      session: null
    };
  }

  render() {
    const { loading } = this.state;
    return this.state.session ? (
      <Redirect to="/profile" />
    ) : (
      <LoginWrapper>
        <CenterContainer>
          <h1>Hi! Welcome to Solid.</h1>
          <LoginPanel>
            <PanelBody>
              <RegisterButton to="/register">
                Register for a solid identity
              </RegisterButton>
              <a
                href="https://solid.inrupt.com/get-a-solid-pod"
                rel="noopener noreferrer"
                target="_blank"
                className="link"
              >
                What is a Solid Identity??
              </a>
              <LoginTitle> Log in</LoginTitle>
              <ProviderLogin />
            </PanelBody>
          </LoginPanel>
        </CenterContainer>
        <Loader show={loading} />
      </LoginWrapper>
    );
  }
}
