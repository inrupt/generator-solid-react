import React, { Component, Fragment } from "react";
import { ToastProvider } from "react-toast-notifications";
import { ToasterNotification } from "@util-components";

import Routes from "./routes";
import { ThemeProvider } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import theme from "./utils/theme";
import "normalize.css";
import "./index.css";
import "@inrupt/inrupt-atomic-style-guide";

library.add(fas);
class App extends Component {
  render() {
    return (
      <ToastProvider
        components={{ Toast: ToasterNotification }}
        placement="top-center"
        autoDismiss={true}
        autoDismissTimeout={3000}
      >
        <ThemeProvider theme={theme}>
          <Fragment>
            <Routes />
          </Fragment>
        </ThemeProvider>
      </ToastProvider>
    );
  }
}

export default App;
