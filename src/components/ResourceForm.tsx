import React from 'react';
import { ResourceConfig } from '../config/types';

interface ResourceFormProps {
  resource: ResourceConfig;
}

const ResourceForm: React.FunctionComponent<ResourceFormProps> = ({ resource }) => {
  return (
    <form className="border rounded p-4 bg-white shadow">
      <h3 className="font-bold mb-2">Create/Edit {resource.label || resource.name}</h3>
      {resource.fields.map((field) => (
        <div key={field.name} className="mb-3">
          <label className="block text-sm font-medium mb-1">{field.label || field.name}</label>
          <input
            className="border px-2 py-1 rounded w-full"
            type={field.inputType || 'text'}
            name={field.name}
            disabled
            placeholder={`[${field.type}]`}
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled>
        Submit
      </button>
    </form>
  );
};

export default ResourceForm;
