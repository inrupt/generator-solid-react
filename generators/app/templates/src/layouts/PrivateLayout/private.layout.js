import React, { useCallback, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { withAuthorization, AppPermission } from '@inrupt/solid-react-components';
import { AuthNavBar, Footer } from '@components';
import { errorToaster } from '@utils';
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

const PrivateLayout = ({ routes, webId, location, history, ...rest }) => {
  const { t } = useTranslation();
  const checkAppPermissions = useCallback(async () => {
    const permission = await AppPermission.checkPermissions(webId);
    /**
     * SDK app will need all the permission by the user pod,
     * so for this reason we check it for that.
     */
    const permissions = permission.permissions.toString();

    if (permissions !== process.env.REACT_APP_PERMISSIONS) {
      errorToaster(t('appPermission.message'), t('errorTitle'), {
        label: t('appPermission.link.label'),
        href: t('appPermission.link.href')
      });
    }
  }, [webId]);

  useEffect(() => {
    if (webId) checkAppPermissions();
  }, [webId]);

  return (
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
};

export default withAuthorization(PrivateLayout);
