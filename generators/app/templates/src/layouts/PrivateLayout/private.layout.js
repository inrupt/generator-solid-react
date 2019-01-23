import React from "react";
import { NotificationContainer } from "react-notifications";
import { Switch, Route, Redirect } from "react-router-dom";

import { AuthNavBar } from "@components";

const PrivateLayout = ({ routes, ...rest }) => {
  return (
    <PrivateRoute
      {...rest}
      render={matchProps => (
        <div className="dashboard--page">
          <AuthNavBar {...matchProps} />
          <div className="dashboard--main">
            <Switch>
              {routes.map(route => (
                <Route key={route.id} {...route} exact />
              ))}
              <Redirect from="/" to="/demo" exact />
              <Redirect to="/404" />
            </Switch>
          </div>
          <NotificationContainer />
        </div>
      )}
    />
  );
};

export default PrivateLayout;
