import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
import { NavBar, AuthNavBar } from "@components";
import { withWebId } from "@inrupt/solid-react-components";

const PublicLayout = ({ component: Component, webId, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <Fragment>
          {webId ? (
            <AuthNavBar {...matchProps} />
          ) : (
            <NavBar
              {...matchProps}
              toolbar={[
                {
                  component: () => <Link to="/login">Login</Link>,
                  label: "authComponent",
                  id: "authComponent"
                }
              ]}
            />
          )}
          <Component {...matchProps} />
        </Fragment>
      )}
    />
  );
};

export default withWebId(PublicLayout);
