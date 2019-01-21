import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { GradientBackground, Panel, CenterContainer } from "@util-components";
import { ProviderItem } from "./children";

type Provider = {};

type Register = {
  provider: String,
  user: {
    username: String,
    password: String,
    email: String
  }
};

type Props = {
  providers: Array<Provider>,
  history: Object,
  t: Function
};

type State = {
  step: Number,
  register: Register,
  canContinue: false
};

class RegisterComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      register: {
        provider: "",
        user: { username: "", password: "", email: "" }
      }
    };
  }

  next = () => {
    const { step, canContinue } = this.state;
    if (step < 2 && canContinue) {
      window.location =
        this.state.register.provider +
        "?returnToUrl=" +
        window.location.protocol +
        "//" +
        window.location.host +
        "/register/success";
    }
  };

  back = () => {
    const { step } = this.state;
    if (step > 1) this.setState({ step: step - 1 });
  };

  selectProvider = e => {
    const { register } = this.state;
    this.setState({
      register: { ...register, provider: e.target.value },
      canContinue: true
    });
  };

  onChangeFormValues = e => {
    const { register } = this.state;
    const { user } = register;
    this.setState({
      register: {
        ...register,
        user: { ...user, [e.target.name]: e.target.value }
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.history.push("/register/success");
  };

  render() {
    const {
      step,
      register: { provider }
    } = this.state;
    const { providers } = this.props;
    const {
      register: { user }
    } = this.state;
    return (
      <GradientBackground className="register--page">
        <CenterContainer className="register--container">
          <h1>Hi! Welcome to Solid.</h1>
          <form onSubmit={this.onSubmit}>
            <Panel className="register--panel">
              <div className="panel-header">
                {step === 1 ? (
                  <h2>Select your Provider</h2>
                ) : (
                  <h2>Create your Solid Identity</h2>
                )}
                <div className={`progress-bar step-${step}`} />
              </div>
              <div className="panel-body">
                {step === 1 && (
                  <Fragment>
                    <a href="#/">
                      What is a provider, and how should I choose one?
                    </a>
                    <Link to="/login" className="a-with-spacing">
                      I already have a Solid identity
                    </Link>
                    <div className="provider-list">
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
                    </div>
                  </Fragment>
                )}
                {step === 2 && (
                  <Fragment>
                    <div className="form-group">
                      <label htmlFor="email">email</label>
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={this.onChangeFormValues}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">username</label>
                      <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={this.onChangeFormValues}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">password</label>
                      <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={this.onChangeFormValues}
                      />
                    </div>
                  </Fragment>
                )}
              </div>
              <div className="actions">
                {step === 2 && (
                  <button type="submit" className="btn-solid">
                    Register
                  </button>
                )}
                {step < 2 && (
                  <button
                    className="btn-solid"
                    onClick={this.next}
                    type="button"
                  >
                    Next
                  </button>
                )}

                {step > 1 && (
                  <button
                    className="btn-outlined"
                    onClick={this.back}
                    type="button"
                  >
                    Back
                  </button>
                )}
              </div>
            </Panel>
          </form>
        </CenterContainer>
      </GradientBackground>
    );
  }
}

export default RegisterComponent;
