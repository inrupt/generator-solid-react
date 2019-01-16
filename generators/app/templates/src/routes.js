import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Home } from "./containers";

const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Redirect from="/" to="/home" />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
