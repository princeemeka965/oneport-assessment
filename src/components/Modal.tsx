import React, { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  title: String;
  subtitle: String;
  children: (props: { close: () => void }) => ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-seaGreen bg-opacity-50">
      <div className="bg-white rounded-md shadow-lg lg:w-1/3 md:w-1/3 w-full">
        <div className="flex justify-between items-center pt-5 pb-3 px-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-semibold">{title}</h2>
            <h6 className="text-xs text-romanSilver">{subtitle}</h6>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 text-lg hover:text-gray-900"
          >
            &times;
          </button>
        </div>
        <div className="w-full border" />
        {children({ close: onClose })}
      </div>
    </div>
  );
};

export default Modal;
