import React from 'react';
import defaultConfig from '../config/defaultConfig';
import { ResourceConfig } from '../config/types';

interface DashboardProps {
  resources?: ResourceConfig[];
  onSelectResource: (resource: ResourceConfig) => void;
}

const Dashboard: React.FunctionComponent<DashboardProps> = ({ resources, onSelectResource }) => {
  const resourceList = resources || defaultConfig.resources;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ul className="space-y-2">
        {resourceList.map((res) => (
          <li key={res.name}>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => onSelectResource(res)}
            >
              {res.label || res.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
