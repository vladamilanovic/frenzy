import { Suspense } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import SuspenseLoader from 'src/components/SuspenseLoader';
import loadable from '@loadable/component';

type Routes = {
  exact?: boolean;
  path?: string | string[];
  layout?: any;
  component?: any;
  routes?: Routes;
}[];

const MyWallet = loadable(() => import('src/pages/MyWallet'));
const BuyBitcoin = loadable(() => import('src/pages/BuyBitcoin'));
const SellBitcoin = loadable(() => import('src/pages/SellBitcoin'));
const BitcoinPrice = loadable(() => import('src/pages/BitcoinPrice'));

export const renderRoutes = (routes: Routes = []) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Switch>
      {routes.map((route, i) => {
        const Layout = route.layout || SidebarLayout;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Layout>
                {route.routes ? (
                  renderRoutes(route.routes)
                ) : (
                  <Component {...props} />
                )}
              </Layout>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes: Routes = [
  {
    exact: true,
    path: '/wallet',
    component: MyWallet
  },
  {
    exact: true,
    path: '/buy',
    component: BuyBitcoin
  },
  {
    exact: true,
    path: '/sell',
    component: SellBitcoin
  },
  {
    exact: true,
    path: '/bitcoin',
    component: BitcoinPrice
  },
  {
    path: '*',
    layout: BaseLayout,
    routes: [
      {
        component: () => <Redirect to="/wallet" />
      }
    ]
  }
];

export default routes;
