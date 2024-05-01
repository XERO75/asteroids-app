import { useAtom } from 'jotai';
import React from 'react';
import { Outlet } from 'react-router-dom';
import CanvasRenderer from '../../components/CanvasRenderer/CanvasRenderer';
import Header from '../../components/Header/Header';
import Tabs from '../../components/Tabs/Tabs';
import { socketDataAtom } from '../../states/socketDataAtom';

const Layout: React.FC = () => {
  const [socketData] = useAtom(socketDataAtom);

  return (
    <div className="flex">
      <div className="w-min-[560px] mx-4">
        <Header />
        <Tabs />
        <div className="border-b border-gray-light" />
        <Outlet />
      </div>
      <div className="flex-1">
        <CanvasRenderer socketData={socketData} />
      </div>
    </div>
  );
};

export default Layout;
