import React from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Drawer: React.FunctionComponent<DrawerProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black bg-opacity-40" onClick={onClose} />
      <div className="ml-auto bg-white w-96 max-w-full h-full shadow-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Drawer;
