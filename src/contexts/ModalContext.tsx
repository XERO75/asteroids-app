import React, { createContext, ReactNode, useState } from 'react';

interface ModalContextType {
  showModal: (content: ReactNode, title: string) => void;
  hideModal: () => Promise<void>;
  modalContent: ReactNode;
  modalTitle: string;
  isVisible: boolean;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string>('');

  const showModal = (content: ReactNode, title: string) => {
    setModalTitle(title);
    setModalContent(content);
    setIsVisible(true);
  };

  const hideModal = (): Promise<void> => {
    return new Promise((resolve) => {
      setIsVisible(false);
      setModalContent(null);
      setModalTitle('');
      resolve();
    });
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal, modalContent, modalTitle, isVisible }}>
      {children}
    </ModalContext.Provider>
  );
};
