import React, { Component } from "react";

import RegisterComponent from "./register.component";

type Props = {};

type State = {
  providers: Array<Object>
};

class RegisterContainer extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { providers: [] };
  }

  async componentDidMount() {
    //const providers = await Auth.getIdentityProviders();
    this.setState({ providers: [] });
  }
  render() {
    const { providers } = this.state;
    return <RegisterComponent providers={providers} {...this.props} />;
  }
}

export default RegisterContainer;
