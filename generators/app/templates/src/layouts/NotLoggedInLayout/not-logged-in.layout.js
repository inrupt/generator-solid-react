import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { NavBar } from "@components";
import { withWebId } from "@inrupt/solid-react-components";

const NotLoggedInLayout = ({ component: Component, webId, ...rest }) => {
  return !webId ? (
    <Route
      {...rest}
      render={matchProps => (
        <Fragment>
          <NavBar {...matchProps} />
          <Component {...matchProps} />
        </Fragment>
      )}
    />
  ) : (
    <Redirect to="/welcome" />
  );
};

export default withWebId(NotLoggedInLayout);
