import React, { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: (props: { close: () => void }) => ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-seaGreen bg-opacity-50">
      <div className="bg-white rounded-md shadow-lg lg:w-1/3 md:w-1/3 w-full">
        {children({ close: onClose })}
      </div>
    </div>
  );
};

export default Modal;
