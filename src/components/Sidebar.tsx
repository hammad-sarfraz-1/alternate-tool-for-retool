import React from 'react';
import { ResourceConfig } from '../config/types';

interface SidebarProps {
  resources: ResourceConfig[];
  currentView: string;
  onSelectResource: (resource: ResourceConfig) => void;
  onSettings: () => void;
}

const Sidebar: React.FunctionComponent<SidebarProps> = ({ resources, currentView, onSelectResource, onSettings }) => (
  <aside className="w-64 bg-white border-r h-full p-4 flex flex-col">
    <div className="mb-6 font-bold text-lg">Resources</div>
    <ul className="flex-1 space-y-2">
      {resources.map((res) => (
        <li key={res.name}>
          <button
            className={`w-full text-left px-3 py-2 rounded ${currentView === res.name ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            onClick={() => onSelectResource(res)}
          >
            {res.label || res.name}
          </button>
        </li>
      ))}
    </ul>
    <button
      className="mt-6 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-left"
      onClick={onSettings}
    >
      Settings
    </button>
  </aside>
);

export default Sidebar;
