import React, { Component, Fragment, Suspense } from "react";
import { ToastProvider } from "react-toast-notifications";
import { ToasterNotification } from "@util-components";

import Routes from "./routes";
import { ThemeProvider } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { Loader } from "@util-components";
import theme from "./utils/theme";
import "flag-icon-css/css/flag-icon.min.css";
import "normalize.css";
import "./index.css";
import "@inrupt/solid-style-guide";

library.add(fas);
library.add(faGithub);
class App extends Component {
  render() {
    return (
      <Suspense fallback={<Loader />}>
        <ThemeProvider theme={theme}>
          <ToastProvider
            components={{ Toast: ToasterNotification }}
            placement="top-center"
            autoDismiss={true}
            autoDismissTimeout={3000}
          >
            <Fragment>
              <Routes />
            </Fragment>
          </ToastProvider>
        </ThemeProvider>
      </Suspense>
    );
  }
}

export default App;
