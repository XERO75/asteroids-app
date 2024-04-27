import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AsteroidsPage from './pages/AsteroidsPage/AsteroidsPage';
import Layout from './pages/Layout/Layout';
import MinersPage from './pages/MinersPage/MinersPage';
import NoMatch from './pages/NoMatch';
import PlanetsPage from './pages/PlanetsPage/PlanetsPage';

export enum RoutePaths {
  Home = '/',
  Miners = '/miners',
  Asteroids = '/asteroids',
  Planets = '/planets',
  NotFound = '*',
}

interface RouteConfig {
  path: string; // 修改为string类型
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
      { path: '/', element: <Navigate replace to="/miners" /> },
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
