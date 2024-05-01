import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import CanvasRenderer from '../../components/CanvasRenderer/CanvasRenderer';
import Header from '../../components/Header/Header';
import Tabs from '../../components/Tabs/Tabs';
import { WS_URL } from '../../config';
import { useSocket } from '../../hooks/useSocket';
import type { SocketData } from '../../types//socketData';

const Layout: React.FC = () => {
  const { socket } = useSocket(WS_URL);
  const [wsData, setWsData] = useState<SocketData>({
    miners: [],
    asteroids: [],
    planets: [],
  });

  useEffect(() => {
    const handleTick = (data: SocketData) => {
      const { miners, asteroids, planets } = data;
      setWsData({
        miners,
        asteroids,
        planets,
      });
    };

    socket.current?.on('tick', handleTick);

    return () => {
      socket.current?.off('tick', handleTick);
    };
  }, []);

  return (
    <div className="flex">
      <div className="w-[560px] mx-4">
        <Header />
        <Tabs />
        <div className="border-b border-gray-light" />
        <Outlet />
      </div>
      <div className="flex-1">
        <CanvasRenderer socketData={wsData} />
      </div>
    </div>
  );
};

export default Layout;
