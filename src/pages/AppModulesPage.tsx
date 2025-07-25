import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { appsState, addModuleToApp, Module } from "../data/apps";

const AppModulesPage: React.FC = () => {
  const { appId } = useParams<{ appId: string }>();
  const [moduleName, setModuleName] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editModuleName, setEditModuleName] = useState("");
  const [editApiEndpoint, setEditApiEndpoint] = useState("");
  const app = appsState.getApp(appId!);
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>(app ? app.modules : []);

  const refreshModules = () => {
    const updatedApp = appsState.getApp(appId!);
    setModules(updatedApp ? updatedApp.modules : []);
  };

  if (!app) return <div className="text-red-500 p-8">App not found.</div>;

  const handleAddModule = () => {
    if (!moduleName.trim()) return;
    // Prevent duplicate by name or API endpoint
    if (
      modules.some(
        (m) =>
          m.name === moduleName.trim() ||
          (apiEndpoint.trim() && m.apiEndpoint === apiEndpoint.trim()),
      )
    ) {
      alert("A module with this name or API endpoint already exists.");
      return;
    }
    addModuleToApp(appId!, moduleName.trim(), apiEndpoint.trim() || undefined);
    setModuleName("");
    setApiEndpoint("");
    refreshModules();
  };

  const handleDeleteModule = (moduleId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this module? This action cannot be undone.",
      )
    )
      return;
    const app = appsState.getApp(appId!);
    if (!app) return;
    app.modules = app.modules.filter((m) => m.id !== moduleId);
    setModules([...app.modules]);
    appsState.getApps(); // persist
  };

  const handleEditModule = (mod: Module) => {
    setEditingModuleId(mod.id);
    setEditModuleName(mod.name);
    setEditApiEndpoint(mod.apiEndpoint || "");
  };

  const handleSaveEditModule = (moduleId: string) => {
    if (!editModuleName.trim()) return;
    // Prevent duplicate (excluding self)
    if (
      modules.some(
        (m) =>
          m.id !== moduleId &&
          (m.name === editModuleName.trim() ||
            (editApiEndpoint.trim() &&
              m.apiEndpoint === editApiEndpoint.trim())),
      )
    ) {
      alert("A module with this name or API endpoint already exists.");
      return;
    }
    const app = appsState.getApp(appId!);
    if (!app) return;
    const mod = app.modules.find((m) => m.id === moduleId);
    if (mod) {
      mod.name = editModuleName.trim();
      mod.apiEndpoint = editApiEndpoint.trim() || undefined;
      setModules([...app.modules]);
      appsState.getApps(); // persist
    }
    setEditingModuleId(null);
    setEditModuleName("");
    setEditApiEndpoint("");
  };

  const handleCancelEdit = () => {
    setEditingModuleId(null);
    setEditModuleName("");
    setEditApiEndpoint("");
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Modules in <span className="text-blue-700">{app.name}</span>
        </h2>
      </div>
      <div className="flex gap-4 mb-6">
        <input
          className="flex-1 border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="New Module Name"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
        />
        <input
          className="flex-1 border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Module API Endpoint (optional)"
          value={apiEndpoint}
          onChange={(e) => setApiEndpoint(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
          onClick={handleAddModule}
        >
          Add Module
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {modules.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-gray-400 py-8">
                  No modules yet. Add your first module!
                </td>
              </tr>
            ) : (
              modules.map((mod: Module, idx: number) => (
                <tr key={mod.id} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4 text-xs text-gray-500">{idx + 1}</td>
                  <td className="px-6 py-4 font-semibold text-blue-700">
                    {editingModuleId === mod.id ? (
                      <input
                        className="border rounded px-2 py-1 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={editModuleName}
                        onChange={(e) => setEditModuleName(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      mod.name
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">{mod.id}</td>
                  <td className="px-6 py-4 flex gap-2">
                    {editingModuleId === mod.id ? (
                      <>
                        <input
                          className="border rounded px-2 py-1 text-xs text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          value={editApiEndpoint}
                          onChange={(e) => setEditApiEndpoint(e.target.value)}
                          placeholder="Module API Endpoint"
                        />
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                          onClick={() => handleSaveEditModule(mod.id)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onClick={() =>
                            navigate(`/app/${appId}/module/${mod.id}`)
                          }
                          aria-label={`Open module ${mod.name}`}
                        >
                          Open
                        </button>
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          onClick={() => handleEditModule(mod)}
                          aria-label={`Edit module ${mod.name}`}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                          onClick={() => handleDeleteModule(mod.id)}
                          aria-label={`Delete module ${mod.name}`}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppModulesPage;
