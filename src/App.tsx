import React from 'react';
import GlobalModal from './components/GlobalModal/GlobalModal';
import { ModalProvider } from './contexts/ModalContext';
import AppRoutes from './routes';
const App: React.FC = () => {
  return (
    <div className="bg-dark min-h-screen text-white">
      <ModalProvider>
        <GlobalModal />
        <AppRoutes />
      </ModalProvider>
    </div>
  );
};

export default App;
