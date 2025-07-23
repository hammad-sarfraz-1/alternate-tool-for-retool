import React, { useState } from 'react';
import { ResourceConfig, FieldConfig } from '../config/types';
import ResourceTable from '../components/ResourceTable';
import ResourceForm from '../components/ResourceForm';

interface ResourcePageProps {
  resource: ResourceConfig;
}

interface RecordData {
  [key: string]: any;
}

const ResourcePage: React.FunctionComponent<ResourcePageProps> = ({ resource }) => {
  // Local state for resource records (mocked for now)
  const [records, setRecords] = useState<RecordData[]>([]);
  const [editing, setEditing] = useState<RecordData | null>(null);

  // Add new record
  const handleCreate = (data: RecordData) => {
    setRecords((prev) => [...prev, data]);
  };

  // Edit record
  const handleEdit = (data: RecordData) => {
    setRecords((prev) => prev.map((rec) => (rec[resource.idField] === data[resource.idField] ? data : rec)));
    setEditing(null);
  };

  // Delete record
  const handleDelete = (id: any) => {
    setRecords((prev) => prev.filter((rec) => rec[resource.idField] !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{resource.label || resource.name}</h2>
      <ResourceTable
        resource={resource}
        records={records}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
      <div className="mt-6">
        <ResourceForm
          resource={resource}
          initialData={editing}
          onSubmit={editing ? handleEdit : handleCreate}
          onCancel={() => setEditing(null)}
        />
      </div>
    </div>
  );
};

export default ResourcePage;
