import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Tabs from '../../components/Tabs/Tabs';
const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Tabs />
      <div className="border-b border-gray-light" />
      <Outlet />
    </>
  );
};

export default Layout;
