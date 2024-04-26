import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Tabs from '../../components/Tabs/Tabs';
const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Tabs />
      <hr className="divider" />
      <Outlet />
    </>
  );
};

export default Layout;
