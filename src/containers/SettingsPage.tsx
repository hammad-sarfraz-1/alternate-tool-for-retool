import React from "react";
import { useSettings } from "../hooks/useSettings";

const SettingsPage: React.FunctionComponent = () => {
  const [settings] = useSettings();

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">API Base URL</label>
          <input
            className="border px-2 py-1 rounded w-full"
            type="text"
            value={settings.apiBaseUrl}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Headers (JSON)
          </label>
          <textarea
            className="border px-2 py-1 rounded w-full"
            value={JSON.stringify(settings.headers, null, 2)}
            rows={4}
            disabled
          />
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
