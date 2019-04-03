import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withAuthorization, LiveUpdate } from "@inrupt/solid-react-components";
import { AuthNavBar, Footer } from "@components";
import styled from "styled-components";

const Content = styled.div`
min-height: calc(100% - 60px);
`;

const PrivateLayout = ({ routes, ...rest }) => {
  return (
    <Route
      {...rest}
      component={matchProps => (
        <Fragment>
          <LiveUpdate>
            <AuthNavBar {...matchProps} />
          </LiveUpdate>
          <Content className={'contentApp'}>
            <Switch>
              {routes.map(route => (
                <Route key={route.id} {...route} exact />
              ))}
              <Redirect to="/404" />
            </Switch>
          </Content>
          <Footer/>
        </Fragment>
      )}
    />
  );
};

export default withAuthorization(PrivateLayout);
