import React, { Fragment } from "react";
import { PrivateRoute } from '@inrupt/solid-react-components';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Login, Register, Home, PageNotFound, WelcomeComponent } from "./containers";

const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/login" component={Login} />

        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/welcome" component={WelcomeComponent} />
        <Route exact path="/404" component={PageNotFound} />
        <Route exact path="/" component={Home} />
        <Redirect to="/404" />
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
