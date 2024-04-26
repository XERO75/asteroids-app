import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AsteroidsPage from './pages/AsteroidsPage';
import Layout from './pages/Layout/Layout';
import MinersPage from './pages/MinersPage';
import NoMatch from './pages/NoMatch';
import PlanetsPage from './pages/PlanetsPage';

enum RoutePaths {
  Home = '/',
  Miners = '/miners',
  Asteroids = '/asteroids',
  Planets = '/planets',
  NotFound = '*',
}

interface RouteConfig {
  path: RoutePaths;
  element: React.ReactElement;
  children?: RouteConfig[];
}

const routeConfigs: RouteConfig[] = [
  {
    path: RoutePaths.Home,
    element: <Layout />,
    children: [
      { path: RoutePaths.Miners, element: <MinersPage /> },
      { path: RoutePaths.Asteroids, element: <AsteroidsPage /> },
      { path: RoutePaths.Planets, element: <PlanetsPage /> },
      { path: RoutePaths.NotFound, element: <NoMatch /> },
    ],
  },
];

const renderRoutes = (routes: RouteConfig[]): React.ReactNode => {
  return routes.map((route, index) => (
    <Route key={index} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};

const AppRoutes: React.FC = () => <Routes>{renderRoutes(routeConfigs)}</Routes>;

export default AppRoutes;
