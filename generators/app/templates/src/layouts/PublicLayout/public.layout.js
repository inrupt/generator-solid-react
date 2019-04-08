import React from "react";
import { Route, Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { NavBar, AuthNavBar, Footer } from "@components";
import { withWebId } from "@inrupt/solid-react-components";
import { LanguageDropdown } from "@util-components";
import styled from "styled-components";

const Container = styled.div`
min-height: 100%;
position: relative;
`;

const FooterContainer = styled.div`
position:absolute;
bottom:0;
width: 100%;
`

const PublicLayout = props => {
  const { component: Component, webId, i18n, ...rest } = props;
  const ComponentWrapper = styled(Component)`
    padding-bottom: 60px;
    height: 100%;
    padding-top: 60px;
  `;

  return (
    <Route
      {...rest}
      component={matchProps => (
        <Container>
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
          <ComponentWrapper {...matchProps} />
          <FooterContainer>
            <Footer />
          </FooterContainer>
        </Container>
      )}
    />
  );
};

export default withTranslation()(withWebId(PublicLayout));
