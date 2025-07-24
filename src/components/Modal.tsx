import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  if (!open) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl bg-white/70 rounded-full px-2 py-1 shadow"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {title && (
          <h2 className="text-lg font-semibold mb-4 text-blue-700 drop-shadow">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
