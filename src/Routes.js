/* eslint-disable react/no-array-index-key */
import React, {
  lazy,
  Suspense,
  Fragment
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import LoadingScreen from './components/LoadingScreen';

const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/app" />
  },
  {
    path: '/app',
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app',
        component: lazy(() => import('./views/reports/DashboardAlternativeView'))
      },
      {
        exact: true,
        path: '/app/podcast',
        component: lazy(() => import('./views/reports/DashboardAlternativeView/PodcastDetails'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },


];

const renderRoutes = (routes) => (routes ? (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
) : null);

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;