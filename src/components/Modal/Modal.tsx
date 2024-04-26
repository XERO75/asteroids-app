import React from 'react';
import './Modal.scss';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-gray-dark m-auto flex-col flex rounded-lg">
        <div className="text-center text-xl pb-4">{title}</div>
        <span className="absolute top-0 right-0 p-4">
          <button
            onClick={onClose}
            className="text-gray-900 font-semibold hover:text-gray-700 focus:text-gray-700 focus:outline-none"
          >
            <i className="iconfont icon-delete text-white"></i>
          </button>
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
