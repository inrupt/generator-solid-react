import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/home" component={LoginContainer} />
        <Redirect from="/" to="/home" />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
