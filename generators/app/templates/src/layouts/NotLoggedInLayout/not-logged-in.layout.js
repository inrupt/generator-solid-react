import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { NavBar, Footer } from "@components";
import { withWebId } from "@inrupt/solid-react-components";
import { LanguageDropdown } from "@util-components";
import styled from "styled-components";


const Container = styled.div`
height: 100%;
position: relative;
`;

const FooterContainer = styled.div`
position:absolute;
bottom:0;
width: 100%;
`


const NotLoggedInLayout = props => {
  const { component: Component, webId, ...rest } = props;
  const ComponentWrapper = styled(Component)`
    padding-bottom: 60px;
    height: 100%;
    padding-top: 60px;
  `;
  return !webId ? (
    <Route
      {...rest}
      component={matchProps => (
        <Container>
          <NavBar
            {...matchProps}
            toolbar={[
              {
                component: () => <LanguageDropdown {...props} />,
                id: "language"
              }
            ]}
          />
          <ComponentWrapper {...matchProps}  />
          <FooterContainer>
            <Footer />
          </FooterContainer>
        </Container>
          
      )}
    />
  ) : (
    <Redirect to="/welcome" />
  );
};

export default withTranslation()(withWebId(NotLoggedInLayout));
