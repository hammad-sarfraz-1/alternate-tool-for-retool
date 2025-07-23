import React from 'react';
import { ResourceConfig } from '../config/types';

interface ResourceTableProps {
  resource: ResourceConfig;
  records: any[];
  onEdit: (record: any) => void;
  onDelete: (id: any) => void;
}

const ResourceTable: React.FunctionComponent<ResourceTableProps> = ({ resource, records, onEdit, onDelete }) => {
  return (
    <div className="border rounded-xl p-6 bg-white/80 shadow-glam">
      <h3 className="font-bold mb-4 text-blue-800 text-xl drop-shadow">{resource.label || resource.name} Table</h3>
      <table className="min-w-full text-sm rounded-xl overflow-hidden">
        <thead>
          <tr>
            {resource.fields.map((field) => (
              <th key={field.name} className="px-4 py-2 border-b text-left bg-blue-50 text-blue-900 font-semibold">{field.label || field.name}</th>
            ))}
            <th className="px-4 py-2 border-b bg-blue-50 text-blue-900 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              {resource.fields.map((field) => (
                <td key={field.name} className="px-4 py-2 border-b text-gray-400">-</td>
              ))}
              <td className="px-4 py-2 border-b text-gray-400">-</td>
            </tr>
          ) : (
            records.map((record, idx) => (
              <tr key={idx} className="hover:bg-blue-50 transition">
                {resource.fields.map((field) => (
                  <td key={field.name} className="px-4 py-2 border-b">
                    {record[field.name] ?? <span className="text-gray-400">-</span>}
                  </td>
                ))}
                <td className="px-4 py-2 border-b space-x-2">
                  <button
                    className="text-blue-600 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded font-semibold text-xs shadow transition"
                    onClick={() => onEdit(record)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 bg-red-100 hover:bg-red-200 px-3 py-1 rounded font-semibold text-xs shadow transition"
                    onClick={() => onDelete(record[resource.idField])}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;
