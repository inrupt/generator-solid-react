import React, { Component, Fragment } from "react";
import { ToastProvider } from "react-toast-notifications";
import { ToasterNotification } from "./components";

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
      <ToastProvider
        components={{ Toast: ToasterNotification }}
        placement="top-center"
      >
        <Fragment>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </Fragment>
      </ToastProvider>
    );
  }
}

export default App;
