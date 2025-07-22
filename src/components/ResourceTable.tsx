import React from 'react';
import { ResourceConfig } from '../config/types';

interface ResourceTableProps {
  resource: ResourceConfig;
}

const ResourceTable: React.FunctionComponent<ResourceTableProps> = ({ resource }) => {
  return (
    <div className="border rounded p-4 bg-white shadow">
      <h3 className="font-bold mb-2">{resource.label || resource.name} Table</h3>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            {resource.fields.map((field) => (
              <th key={field.name} className="px-2 py-1 border-b text-left">{field.label || field.name}</th>
            ))}
            <th className="px-2 py-1 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Placeholder row */}
          <tr>
            {resource.fields.map((field) => (
              <td key={field.name} className="px-2 py-1 border-b text-gray-400">-</td>
            ))}
            <td className="px-2 py-1 border-b text-gray-400">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;
