import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { appsState } from "../data/apps";

const WelcomePage: React.FC = () => {
  const [appName, setAppName] = useState("");
  const [apps, setApps] = useState(appsState.getApps());
  const [editingAppId, setEditingAppId] = useState<string | null>(null);
  const [editAppName, setEditAppName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setApps(appsState.getApps());
  }, []);

  const handleCreateApp = () => {
    if (!appName.trim()) return;
    appsState.addApp(appName.trim());
    setApps(appsState.getApps());
    setAppName("");
  };

  // Update app name in mock state
  const handleUpdateApp = (appId: string) => {
    if (!editAppName.trim()) return;
    const app = appsState.getApp(appId);
    if (app) app.name = editAppName.trim();
    setApps(appsState.getApps());
    setEditingAppId(null);
    setEditAppName("");
  };

  // Delete app from mock state
  const handleDeleteApp = (appId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this app? This action cannot be undone.",
      )
    )
      return;
    const idx = appsState.getApps().findIndex((a) => a.id === appId);
    if (idx !== -1) {
      appsState.getApps().splice(idx, 1);
      setApps(appsState.getApps());
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Welcome! Choose or Create an App
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          className="flex-1 border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="New App Name"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
          onClick={handleCreateApp}
        >
          Create App
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
            {apps.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-gray-400 py-8">
                  No apps yet. Create your first app!
                </td>
              </tr>
            ) : (
              apps.map((app) => (
                <tr key={app.id} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4 font-semibold text-blue-700">
                    {editingAppId === app.id ? (
                      <input
                        className="border rounded px-2 py-1 text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={editAppName}
                        onChange={(e) => setEditAppName(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleUpdateApp(app.id);
                          if (e.key === "Escape") setEditingAppId(null);
                        }}
                        aria-label="Edit app name"
                      />
                    ) : (
                      app.name
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">{app.id}</td>
                  <td className="px-6 py-4 flex gap-2 items-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={() => navigate(`/app/${app.id}`)}
                      aria-label={`Open app ${app.name}`}
                    >
                      Open
                    </button>
                    {editingAppId === app.id ? (
                      <>
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                          onClick={() => handleUpdateApp(app.id)}
                          aria-label="Save app name"
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                          onClick={() => setEditingAppId(null)}
                          aria-label="Cancel editing"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        onClick={() => {
                          setEditingAppId(app.id);
                          setEditAppName(app.name);
                        }}
                        aria-label={`Edit app ${app.name}`}
                      >
                        Update
                      </button>
                    )}
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                      onClick={() => handleDeleteApp(app.id)}
                      aria-label={`Delete app ${app.name}`}
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
    </div>
  );
};

export default WelcomePage;
