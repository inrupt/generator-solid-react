import React, { useCallback, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  withAuthorization,
  AppPermission,
  AccessControlList
} from '@inrupt/solid-react-components';
import { AuthNavBar, Footer } from '@components';
import { errorToaster, checkAppPermissions } from '@utils';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
`;

const Content = styled.div`
  padding-top: 60px;
  flex: 1 0 auto;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
`;

const PrivateLayout = ({ routes, webId, location, history, ...rest }) => {
  const { t } = useTranslation();
  /**
   * SDK app will need all the permissions by the user pod so
   * we check these permissions to work without any issues.
   */
  const checkPermissions = useCallback(async () => {
    /**
     * Get permissions from trustedApp.
     */
    const userApp = await AppPermission.checkPermissions(webId);
    /**
     * Get modes permissions from solid-react-components
     */
    const permissions = AccessControlList.MODES;
    const { APPEND, READ, WRITE, CONTROL } = permissions;

    if (!checkAppPermissions(userApp.permissions, [APPEND, READ, WRITE, CONTROL])) {
      errorToaster(t('appPermission.message'), t('notifications.error'), {
        label: t('appPermission.link.label'),
        href: t('appPermission.link.href')
      });
    }
  }, [webId]);

  useEffect(() => {
    if (webId) checkPermissions();
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
