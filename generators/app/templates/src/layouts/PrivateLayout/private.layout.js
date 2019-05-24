import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withAuthorization, LiveUpdate } from '@inrupt/solid-react-components';
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
  flex-grow: 1;
  display: flex;
  & > * {
    flex-grow: 1;
  }
`;

const PrivateLayout = ({ routes, ...rest }) => {
  return (
    <Route
      {...rest}
      component={matchProps => (
        <Container>
          <LiveUpdate>
            <AuthNavBar {...matchProps} />
          </LiveUpdate>
          <Content className="contentApp">
            <Switch>
              {routes.map(route => (
                <Route key={route.id} {...route} exact />
              ))}
              <Redirect to="/404" />
            </Switch>
          </Content>
          <Footer />
        </Container>
      )}
    />
  );
};

export default withAuthorization(PrivateLayout);
