import React from "react";

interface FieldManagerSidebarProps {
  show: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function FieldManagerSidebar({
  show,
  onClose,
  children,
}: FieldManagerSidebarProps) {
  if (!show) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 p-4 overflow-y-auto transition-transform duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Field Manager</h2>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
        >
          ×
        </button>
      </div>
      {children}
    </div>
  );
}
