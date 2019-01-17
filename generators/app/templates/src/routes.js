import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Home, Register } from "./containers";

const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Redirect from="/" to="/home" />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
