import React from 'react';
import { ResourceConfig } from '../config/types';
import ResourceTable from '../components/ResourceTable';
import ResourceForm from '../components/ResourceForm';

interface ResourcePageProps {
  resource: ResourceConfig;
}

const ResourcePage: React.FunctionComponent<ResourcePageProps> = ({ resource }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{resource.label || resource.name}</h2>
      <ResourceTable resource={resource} />
      <div className="mt-6">
        <ResourceForm resource={resource} />
      </div>
    </div>
  );
};

export default ResourcePage;
