import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { appsState, addModuleToApp, Module } from "../data/apps";

const AppModulesPage: React.FC = () => {
  const { appId } = useParams<{ appId: string }>();
  const [moduleName, setModuleName] = useState("");
  const app = appsState.getApp(appId!);
  const navigate = useNavigate();

  if (!app) return <div className="text-red-500 p-8">App not found.</div>;

  const handleAddModule = () => {
    if (!moduleName.trim()) return;
    addModuleToApp(appId!, moduleName.trim());
    setModuleName("");
    navigate(0);
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
            {app.modules.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-gray-400 py-8">
                  No modules yet. Add your first module!
                </td>
              </tr>
            ) : (
              app.modules.map((mod: Module) => (
                <tr key={mod.id} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4 font-semibold text-blue-700">
                    {mod.name}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">{mod.id}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={() => navigate(`/app/${appId}/module/${mod.id}`)}
                      aria-label={`Open module ${mod.name}`}
                    >
                      Open
                    </button>
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
