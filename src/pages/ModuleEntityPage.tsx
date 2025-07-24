import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { appsState, Module, Entity, Field } from "../data/apps";

const fieldTypes = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Date", value: "date" },
];

const ID_FIELD = "id";

const SIDEBAR_WIDTH = "w-80";

const ModuleEntityPage: React.FC = () => {
  const { appId, moduleId } = useParams<{ appId: string; moduleId: string }>();
  const navigate = useNavigate();
  const app = appsState.getApp(appId!);
  const module = app?.modules.find((m) => m.id === moduleId);

  // State for fields and entities
  const [fields, setFields] = useState<Field[]>(module?.fields || []);
  const [entities, setEntities] = useState<Entity[]>(module?.entities || []);
  const [newField, setNewField] = useState<Field>({ name: "", type: "text" });
  const [editingFieldIdx, setEditingFieldIdx] = useState<number | null>(null);
  const [editField, setEditField] = useState<Field>({ name: "", type: "text" });
  const [newEntity, setNewEntity] = useState<{ [key: string]: any }>({});
  const [selectedModuleId, setSelectedModuleId] = useState(moduleId);
  const [editEntityId, setEditEntityId] = useState<string | null>(null);
  const [entityError, setEntityError] = useState<string | null>(null);

  useEffect(() => {
    setFields(module?.fields || []);
    setEntities(module?.entities || []);
    setSelectedModuleId(moduleId);
  }, [moduleId, appId]);

  // Persist fields/entities
  const persistFields = (newFields: Field[], newEntities?: Entity[]) => {
    setFields(newFields);
    if (appId && moduleId)
      appsState.updateModuleFields(appId, moduleId, newFields);
    if (newEntities) {
      const safeEntities: Entity[] = newEntities.map((e) => {
        const { id, name, ...rest } = e;
        const safeId =
          typeof id === "string" ? id : Math.random().toString(36).slice(2, 10);
        const safeName = typeof name === "string" ? name : "";
        return { id: safeId, name: safeName, ...rest };
      });
      setEntities(safeEntities);
      if (appId && moduleId)
        appsState.updateModuleEntities(appId, moduleId, safeEntities);
    }
  };
  const persistEntities = (newEntities: Entity[]) => {
    const safeEntities: Entity[] = newEntities.map((e) => {
      const { id, name, ...rest } = e;
      const safeId =
        typeof id === "string" ? id : Math.random().toString(36).slice(2, 10);
      const safeName = typeof name === "string" ? name : "";
      return { id: safeId, name: safeName, ...rest };
    });
    setEntities(safeEntities);
    if (appId && moduleId)
      appsState.updateModuleEntities(appId, moduleId, safeEntities);
  };

  if (!app || !module)
    return <div className="text-red-500 p-8">Module not found.</div>;

  // Field CRUD
  const handleAddField = () => {
    if (!newField.name.trim() || fields.some((f) => f.name === newField.name))
      return;
    const updatedFields = [...fields, newField];
    persistFields(updatedFields);
    setNewField({ name: "", type: "text" });
  };
  const handleEditField = (idx: number) => {
    setEditingFieldIdx(idx);
    setEditField(fields[idx]);
  };
  const handleSaveField = (idx: number) => {
    if (
      !editField.name.trim() ||
      fields.some((f, i) => i !== idx && f.name === editField.name)
    )
      return;
    const oldName = fields[idx].name;
    const updatedFields = fields.map((f, i) => (i === idx ? editField : f));
    let updatedEntities = entities;
    if (oldName !== editField.name) {
      updatedEntities = entities.map((e) => {
        const { [oldName]: oldVal, id, name, ...rest } = e;
        return { id, name, ...rest, [editField.name]: oldVal };
      });
    }
    persistFields(updatedFields, updatedEntities);
    setEditingFieldIdx(null);
    setEditField({ name: "", type: "text" });
  };
  const handleCancelFieldEdit = () => {
    setEditingFieldIdx(null);
    setEditField({ name: "", type: "text" });
  };
  const handleRemoveField = (idx: number) => {
    const fieldName = fields[idx].name;
    const updatedFields = fields.filter((_, i) => i !== idx);
    const updatedEntities = entities.map((e) => {
      const { [fieldName]: _, id, name, ...rest } = e;
      return { id, name, ...rest };
    });
    persistFields(updatedFields, updatedEntities);
  };
  const handleModuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newModuleId = e.target.value;
    setSelectedModuleId(newModuleId);
    if (newModuleId !== moduleId) {
      navigate(`/app/${appId}/module/${newModuleId}`);
    }
  };

  // Entity CRUD
  const handleAddEntity = () => {
    // Validate all fields are filled
    for (const field of fields) {
      if (
        !newEntity[field.name] ||
        newEntity[field.name].toString().trim() === ""
      ) {
        setEntityError("All fields are required.");
        return;
      }
    }
    setEntityError(null);
    const entity: Entity = {
      id: Math.random().toString(36).slice(2, 10),
      name: newEntity.name || "",
      ...newEntity,
    };
    const updatedEntities = [...entities, entity];
    persistEntities(updatedEntities);
    setNewEntity({});
  };
  const handleEntityChange = (id: string, field: string, value: any) => {
    const updatedEntities = entities.map((e) =>
      e.id === id ? { ...e, [field]: value } : e,
    );
    persistEntities(updatedEntities);
  };
  const handleDeleteEntity = (id: string) => {
    const updatedEntities = entities.filter((e) => e.id !== id);
    persistEntities(updatedEntities);
  };

  // Edit entity: populate form
  const handleEditEntity = (entity: Entity) => {
    setEditEntityId(entity.id);
    setNewEntity(
      fields.reduce(
        (acc, f) => ({ ...acc, [f.name]: entity[f.name] || "" }),
        {},
      ),
    );
  };

  // Save edited entity
  const handleSaveEntity = () => {
    // Validate all fields are filled
    for (const field of fields) {
      if (
        !newEntity[field.name] ||
        newEntity[field.name].toString().trim() === ""
      ) {
        setEntityError("All fields are required.");
        return;
      }
    }
    setEntityError(null);
    const updatedEntities = entities.map((e) =>
      e.id === editEntityId ? { ...e, ...newEntity } : e,
    );
    persistEntities(updatedEntities);
    setEditEntityId(null);
    setNewEntity({});
  };

  // Only one handleCancelEdit definition
  const handleCancelEdit = () => {
    setEditEntityId(null);
    setNewEntity({});
  };

  // Sidebar Field Manager UI
  const renderSidebar = () => (
    <aside
      className={`fixed top-0 left-0 h-full ${SIDEBAR_WIDTH} bg-white shadow-lg p-6 flex flex-col gap-6 z-30 border-r`}
    >
      <div>
        <h2 className="text-xl font-bold mb-4">Field Manager</h2>
        <label className="block text-sm font-medium mb-2">Select Module</label>
        <select
          className="w-full border rounded px-3 py-2 mb-4"
          value={selectedModuleId}
          onChange={handleModuleChange}
        >
          {app.modules.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <div className="flex gap-2 mb-4">
          <input
            className="border rounded px-3 py-2 flex-1"
            placeholder="Field Name"
            value={editingFieldIdx !== null ? editField.name : newField.name}
            onChange={(e) => {
              if (editingFieldIdx !== null)
                setEditField((f) => ({ ...f, name: e.target.value }));
              else setNewField((f) => ({ ...f, name: e.target.value }));
            }}
          />
          <select
            className="border rounded px-3 py-2"
            value={editingFieldIdx !== null ? editField.type : newField.type}
            onChange={(e) => {
              if (editingFieldIdx !== null)
                setEditField((f) => ({ ...f, type: e.target.value }));
              else setNewField((f) => ({ ...f, type: e.target.value }));
            }}
          >
            {fieldTypes.map((ft) => (
              <option key={ft.value} value={ft.value}>
                {ft.label}
              </option>
            ))}
          </select>
          {editingFieldIdx !== null ? (
            <>
              <button
                className="bg-green-600 text-white px-3 py-2 rounded font-semibold"
                onClick={() => handleSaveField(editingFieldIdx)}
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-3 py-2 rounded font-semibold"
                onClick={handleCancelFieldEdit}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="bg-blue-600 text-white px-3 py-2 rounded font-semibold"
              onClick={handleAddField}
            >
              Add Field
            </button>
          )}
        </div>
        <table className="w-full text-sm border rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Field Name</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f, idx) => (
              <tr key={f.name}>
                <td className="p-2 border">{f.name}</td>
                <td className="p-2 border">{f.type}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 rounded"
                    onClick={() => handleEditField(idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 rounded"
                    onClick={() => handleRemoveField(idx)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </aside>
  );

  // Main content: Add/Edit Entity form and Table
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      {renderSidebar()}
      {/* Main content */}
      <main className="flex-1 ml-80 max-w-5xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-6">
          Entities in <span className="text-blue-700">{module.name}</span>
        </h2>
        {fields.length > 0 && (
          <div className="mb-8 bg-white rounded-xl shadow p-6">
            <h4 className="font-semibold mb-2">Add New Entity</h4>
            <form
              className="flex gap-4 mb-4 items-center"
              onSubmit={(e) => {
                e.preventDefault();
                if (editEntityId) handleSaveEntity();
                else handleAddEntity();
              }}
            >
              {fields.map((f) => (
                <input
                  key={f.name}
                  className="border rounded px-3 py-2 flex-1"
                  placeholder={f.name}
                  type={
                    f.type === "number"
                      ? "number"
                      : f.type === "date"
                        ? "date"
                        : "text"
                  }
                  value={newEntity[f.name] || ""}
                  onChange={(e) =>
                    setNewEntity((en) => ({ ...en, [f.name]: e.target.value }))
                  }
                />
              ))}
              <div className="flex gap-2 ml-auto">
                {editEntityId ? (
                  <>
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Add
                  </button>
                )}
              </div>
            </form>
            {entityError && (
              <div className="text-red-500 font-bold text-lg mb-2">
                {entityError}
              </div>
            )}
            <table className="min-w-full divide-y divide-gray-200 mt-4">
              <thead>
                <tr>
                  {fields.map((f) => (
                    <th
                      key={f.name}
                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {f.name}
                    </th>
                  ))}
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {entities.length === 0 ? (
                  <tr>
                    <td
                      colSpan={fields.length + 1}
                      className="text-center text-gray-400 py-8"
                    >
                      No entities yet.
                    </td>
                  </tr>
                ) : (
                  entities.map((entity) => (
                    <tr key={entity.id} className="hover:bg-blue-50 transition">
                      {fields.map((f) => (
                        <td key={f.name} className="px-4 py-2">
                          {/* Read-only: show as text, not input */}
                          {entity[f.name] || ""}
                        </td>
                      ))}
                      <td className="px-4 py-2 flex gap-2">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-blue-700"
                          onClick={() => handleEditEntity(entity)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-red-700"
                          onClick={() => handleDeleteEntity(entity.id)}
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
        )}
      </main>
    </div>
  );
};

export default ModuleEntityPage;
