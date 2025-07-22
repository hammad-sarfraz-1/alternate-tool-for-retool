import React, { useState } from 'react';
import Dashboard from './containers/Dashboard';
import ResourcePage from './containers/ResourcePage';
import SettingsPage from './containers/SettingsPage';
import defaultConfig from './config/defaultConfig';
import { ResourceConfig } from './config/types';

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'resource' | 'settings'>('dashboard');
  const [selectedResource, setSelectedResource] = useState<ResourceConfig | null>(null);

  const handleSelectResource = (resource: ResourceConfig) => {
    setSelectedResource(resource);
    setView('resource');
  };

  const handleBack = () => {
    setView('dashboard');
    setSelectedResource(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div className="font-bold text-lg">CRUD UI Generator</div>
        <div className="space-x-4">
          <button onClick={() => setView('dashboard')} className="text-blue-600 hover:underline">Dashboard</button>
          <button onClick={() => setView('settings')} className="text-blue-600 hover:underline">Settings</button>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto py-8">
        {view === 'dashboard' && (
          <Dashboard resources={defaultConfig.resources} onSelectResource={handleSelectResource} />
        )}
        {view === 'resource' && selectedResource && (
          <>
            <button className="mb-4 text-blue-600 hover:underline" onClick={handleBack}>&larr; Back</button>
            <ResourcePage resource={selectedResource} />
          </>
        )}
        {view === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
};

export default App;
