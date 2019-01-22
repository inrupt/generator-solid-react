/* eslint-disable constructor-super */
import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { ProviderLogin } from "solid-react-components";
import {
  GradientBackground,
  CenterContainer,
  Panel,
  Loader
} from "@util-components";

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
    const { loading, withWebId, idp } = this.state;
    return this.state.session ? (
      <Redirect to="/profile" />
    ) : (
      <GradientBackground className="solid--login--page">
        <CenterContainer>
          <h1>Hi! Welcome to Solid.</h1>
          <Panel className="login-panel">
            <div className="panel-body">
              <div className="login-form">
                <Link to="/register" className="link">
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
                <span className="login-title"> Log in</span>
                <ProviderLogin />
              </div>
            </div>
          </Panel>
        </CenterContainer>
        <Loader show={loading} />
      </GradientBackground>
    );
  }
}
