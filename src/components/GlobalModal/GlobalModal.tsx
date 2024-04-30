// src/components/GlobalModal.tsx
import { useModal } from '../../hooks/useModal';
import Modal from '../Modal/Modal';

const GlobalModal = () => {
  const { modalContent, modalTitle, isVisible, hideModal } = useModal();

  return (
    <Modal title={modalTitle} isOpen={isVisible} onClose={hideModal}>
      {modalContent}
    </Modal>
  );
};

export default GlobalModal;
