import React, { Component, Fragment } from "react";

import Routes from "./routes";
import "@inrupt/inrupt-atomic-style-guide";

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
