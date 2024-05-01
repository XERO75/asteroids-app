import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import GlobalModal from './components/GlobalModal/GlobalModal';
import { WS_URL } from './config';
import { ModalProvider } from './contexts/ModalContext';
import { useSocket } from './hooks/useSocket';
import AppRoutes from './routes';
import { socketDataAtom } from './states/socketDataAtom';
import { SocketData } from './types/socketData';
const App: React.FC = () => {
  const { socket } = useSocket(WS_URL);
  const [, setWsData] = useAtom(socketDataAtom);

  useEffect(() => {
    const handleTick = (data: SocketData) => {
      const { miners, asteroids, planets } = data;
      setWsData({ miners, asteroids, planets });
    };

    socket.current?.on('tick', handleTick);

    return () => {
      socket.current?.off('tick', handleTick);
    };
  }, [setWsData, socket]);

  return (
    <div className="bg-dark min-h-screen w-full text-white">
      <ModalProvider>
        <GlobalModal />
        <AppRoutes />
      </ModalProvider>
    </div>
  );
};

export default App;
