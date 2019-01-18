import React, { Component, Fragment } from "react";
import { ToastProvider } from "react-toast-notifications";
import { ToasterNotification } from "./components";

import Routes from "./routes";
import './index.css';
import '@inrupt/inrupt-atomic-style-guide';
import 'normalize.css';

class App extends Component {
  render() {
    return (
      <ToastProvider
        components={{ Toast: ToasterNotification }}
        placement="top-center"
      >
        <Fragment>
          <Routes />
        </Fragment>
      </ToastProvider>
    );
  }
}

export default App;
