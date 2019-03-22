import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withAuthorization } from "@inrupt/solid-react-components";
import { AuthNavBar, Footer } from "@components";

const PrivateLayout = ({ routes, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <Fragment>
          <AuthNavBar {...matchProps} />
          <Fragment>
            <Switch>
              {routes.map(route => (
                <Route key={route.id} {...route} exact />
              ))}
              <Redirect to="/404" />
            </Switch>
          </Fragment>
          <Footer></Footer>
        </Fragment>
      )}
    />
  );
};

export default withAuthorization(PrivateLayout);
