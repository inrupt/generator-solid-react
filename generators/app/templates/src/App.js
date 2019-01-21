import React, { Component, Fragment } from "react";
import Routes from "./routes";
import { ThemeProvider } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import "@inrupt/inrupt-atomic-style-guide";
import "normalize.css";

library.add(fas);

const theme = {};
class App extends Component {
  render() {
    return (
      <Fragment>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </Fragment>
    );
  }
}

export default App;
