import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { NavBar, AuthNavBar } from "@components";
import { withWebId } from "@inrupt/solid-react-components";
import { LanguageDropdown } from "@util-components";

const PublicLayout = props => {
  const { component: Component, webId, i18n, ...rest } = props;
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
                  component: () => <LanguageDropdown {...props} />,
                  id: "language"
                },
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

export default withTranslation()(withWebId(PublicLayout));
