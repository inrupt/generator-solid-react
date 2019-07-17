import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withAuthorization } from '@inrupt/solid-react-components';
import { AuthNavBar, Footer } from '@components';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
`;

const Content = styled.div`
  padding-top: 60px;
  flex: 1 0 auto;
  display: flex;
  overflow-y: auto;
`;

const PrivateLayout = ({ routes, webId, location, history, ...rest }) => (
  <React.Fragment>
    <Container>
      <Route
        {...rest}
        component={({ history }) => (
          <Content className="contentApp">
            <AuthNavBar {...{ location, webId, history }} />
            <Switch>
              {routes.map(route => {
                const { component: RouteComponent } = route;
                return (
                  <Route
                    key={route.id}
                    path={route.path}
                    render={routerProps => <RouteComponent {...routerProps} webId={webId} />}
                    webId={webId}
                    exact
                  />
                );
              })}
              <Redirect to="/404" />
            </Switch>
          </Content>
        )}
      />
      <Footer />
    </Container>
  </React.Fragment>
);

export default withAuthorization(PrivateLayout);
