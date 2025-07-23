import React, { useState } from 'react';
import defaultConfig from '../config/defaultConfig';
import { ResourceConfig, FieldConfig, FieldType } from '../config/types';
import Modal from '../components/Modal';

interface DashboardProps {
  resources?: ResourceConfig[];
  onSelectResource: (resource: ResourceConfig) => void;
}

const resourceIcons: Record<string, string> = {
  users: '👤',
  posts: '📝',
  // Add more icons for other resource types as needed
};

const fieldTypes: FieldType[] = ['string', 'number', 'boolean', 'date', 'enum', 'custom'];

const Dashboard: React.FunctionComponent<DashboardProps> = ({ resources, onSelectResource }) => {
  // Use local state for dynamic resources
  const [resourceList, setResourceList] = useState<ResourceConfig[]>(resources || defaultConfig.resources);
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldsModalOpen, setFieldsModalOpen] = useState(false);
  const [activeResourceIdx, setActiveResourceIdx] = useState<number | null>(null);

  // Placeholder for form state
  const [newResource, setNewResource] = useState({
    name: '',
    label: '',
    idField: '',
  });

  // Field management state
  const [newField, setNewField] = useState<FieldConfig>({ name: '', label: '', type: 'string', inputType: 'text', required: false });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewResource({ ...newResource, [e.target.name]: e.target.value });
  };

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResource.name || !newResource.idField) return;
    setResourceList([
      ...resourceList,
      {
        name: newResource.name,
        label: newResource.label,
        idField: newResource.idField,
        endpoints: { list: '', create: '', update: '', delete: '' },
        fields: [],
      },
    ]);
    setModalOpen(false);
    setNewResource({ name: '', label: '', idField: '' });
  };

  const handleDeleteResource = (name: string) => {
    setResourceList(resourceList.filter((res) => res.name !== name));
  };

  // Field management handlers
  const openFieldsModal = (idx: number) => {
    setActiveResourceIdx(idx);
    setFieldsModalOpen(true);
    setNewField({ name: '', label: '', type: 'string', inputType: 'text', required: false });
  };

  const handleFieldInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setNewField((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setNewField((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newField.name) return;
    setResourceList((prev) =>
      prev.map((res, idx) =>
        idx === activeResourceIdx
          ? { ...res, fields: [...res.fields, { ...newField, type: newField.type as FieldType }] }
          : res
      )
    );
    setNewField({ name: '', label: '', type: 'string', inputType: 'text', required: false });
  };

  const handleDeleteField = (fieldIdx: number) => {
    setResourceList((prev) =>
      prev.map((res, idx) =>
        idx === activeResourceIdx
          ? { ...res, fields: res.fields.filter((_, i) => i !== fieldIdx) }
          : res
      )
    );
  };

  return (
    <div className="p-4 bg-glam min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-blue-800 drop-shadow">Resources</h1>
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-xl shadow-glam hover:from-blue-600 hover:to-blue-800 transition font-semibold flex items-center gap-2 text-lg"
          onClick={() => setModalOpen(true)}
        >
          <span className="text-2xl">＋</span> Add Resource
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {resourceList.map((res, idx) => (
          <div
            key={res.name}
            className="rounded-xl shadow-glam p-7 flex flex-col items-start bg-white/70 backdrop-blur-md border border-blue-100 hover:shadow-2xl hover:scale-105 transition cursor-pointer relative group"
            style={{ minHeight: '180px' }}
            onClick={() => onSelectResource(res)}
          >
            <button
              className="absolute top-3 right-3 text-gray-300 hover:text-red-500 text-xl font-bold z-10 bg-white/70 rounded-full px-2 py-1 shadow"
              title="Delete resource"
              onClick={e => { e.stopPropagation(); handleDeleteResource(res.name); }}
            >
              ×
            </button>
            <button
              className="absolute top-3 left-3 text-blue-400 hover:text-blue-700 text-xs font-bold z-10 bg-blue-50 px-2 py-1 rounded shadow-sm"
              title="Manage fields"
              onClick={e => { e.stopPropagation(); openFieldsModal(idx); }}
            >
              Manage Fields
            </button>
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform drop-shadow">
              {resourceIcons[res.name] || '📦'}
            </div>
            <div className="font-bold text-xl mb-1 text-blue-700 group-hover:underline drop-shadow">
              {res.label || res.name}
            </div>
            <div className="text-gray-500 text-sm">{res.fields.length} fields</div>
          </div>
        ))}
      </div>
      {/* Add Resource Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add New Resource">
        <form onSubmit={handleAddResource} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Resource Name</label>
            <input
              className="border px-2 py-1 rounded w-full"
              name="name"
              value={newResource.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Label</label>
            <input
              className="border px-2 py-1 rounded w-full"
              name="label"
              value={newResource.label}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ID Field</label>
            <input
              className="border px-2 py-1 rounded w-full"
              name="idField"
              value={newResource.idField}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold w-full hover:bg-blue-700 transition">Add Resource</button>
        </form>
      </Modal>
      {/* Manage Fields Modal */}
      <Modal open={fieldsModalOpen} onClose={() => setFieldsModalOpen(false)} title="Manage Fields">
        {activeResourceIdx !== null && (
          <div>
            <ul className="mb-4 divide-y">
              {resourceList[activeResourceIdx].fields.map((field, i) => (
                <li key={i} className="flex items-center justify-between py-2">
                  <span>
                    <span className="font-semibold text-blue-700">{field.label || field.name}</span>
                    <span className="text-xs text-gray-400 ml-2">[{field.type}]</span>
                  </span>
                  <button
                    className="text-red-500 hover:underline text-xs"
                    onClick={() => handleDeleteField(i)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <form onSubmit={handleAddField} className="space-y-2">
              <div className="flex gap-2">
                <input
                  className="border px-2 py-1 rounded w-1/3"
                  name="name"
                  value={newField.name}
                  onChange={handleFieldInputChange}
                  placeholder="Field name"
                  required
                />
                <input
                  className="border px-2 py-1 rounded w-1/3"
                  name="label"
                  value={newField.label}
                  onChange={handleFieldInputChange}
                  placeholder="Label"
                />
                <select
                  className="border px-2 py-1 rounded w-1/3"
                  name="type"
                  value={newField.type}
                  onChange={handleFieldInputChange}
                >
                  {fieldTypes.map((ft) => (
                    <option key={ft} value={ft}>{ft.charAt(0).toUpperCase() + ft.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="required"
                  checked={!!newField.required}
                  onChange={handleFieldInputChange}
                  id="required"
                />
                <label htmlFor="required" className="text-sm">Required</label>
                <button type="submit" className="ml-auto bg-blue-600 text-white px-3 py-1 rounded font-semibold hover:bg-blue-700 transition text-sm">Add Field</button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
