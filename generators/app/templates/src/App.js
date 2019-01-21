import React, { Component, Fragment } from "react";
import Routes from "./routes";
import './index.css';
import '@inrupt/inrupt-atomic-style-guide';
import 'normalize.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Routes />
      </Fragment>
    );
  }
}

export default App;
