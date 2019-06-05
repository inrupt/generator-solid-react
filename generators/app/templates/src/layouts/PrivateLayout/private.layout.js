import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withAuthorization, LiveUpdate } from "@inrupt/solid-react-components";
import { AuthNavBar, Footer } from "@components";
import styled from "styled-components";

const Container = styled.div`
min-height: 100%;
position: relative;
`;

const FooterContainer = styled.div`
position:absolute;
bottom:0;
width: 100%;
`;

const Content = styled.div`
padding-bottom: 60px;
height: 100%;
`;

const PrivateLayout = ({ routes, ...rest }) => {
  return (
    <Route
      {...rest}
      component={matchProps => (
        <Container>
          { rest.webId && <LiveUpdate subscribe={rest.webId}>
            <AuthNavBar {...matchProps} />
          </LiveUpdate>}
          <Content className={'contentApp'}>
            <Switch>
              {routes.map(route => (
                <Route key={route.id} {...route} exact />
              ))}
              <Redirect to="/404" />
            </Switch>
          </Content>
          <FooterContainer>
            <Footer />
          </FooterContainer>
        </Container>
      )}
    />
  );
};

export default withAuthorization(PrivateLayout);
