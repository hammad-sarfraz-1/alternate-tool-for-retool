import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import Dashboard from './containers/Dashboard';
import ResourcePage from './containers/ResourcePage';
import SettingsPage from './containers/SettingsPage';
import defaultConfig from './config/defaultConfig';
import Sidebar from './components/Sidebar';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex bg-gray-50">
        <SidebarWithRouting />
        <div className="flex-1 flex flex-col min-h-screen">
          <HeaderWithRouting />
          <main className="flex-1 max-w-5xl mx-auto w-full py-10 px-6">
            <Routes>
              <Route path="/" element={<DashboardWithRouting />} />
              <Route path="/resource/:name" element={<ResourcePageWithRouting />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
          <footer className="text-center text-xs text-gray-400 py-4 border-t bg-white">
            &copy; {new Date().getFullYear()} CRUD UI Generator. Crafted with <span role="img" aria-label="sparkles">✨</span> by a Senior Frontend Engineer.
          </footer>
        </div>
      </div>
    </Router>
  );
};

function SidebarWithRouting() {
  const navigate = useNavigate();
  const resources = defaultConfig.resources;
  const currentPath = window.location.pathname;
  return (
    <Sidebar
      resources={resources}
      currentView={currentPath.startsWith('/resource/') ? currentPath.split('/resource/')[1] : currentPath === '/settings' ? 'settings' : 'dashboard'}
      onSelectResource={res => navigate(`/resource/${res.name}`)}
      onSettings={() => navigate('/settings')}
    />
  );
}

function HeaderWithRouting() {
  const currentPath = window.location.pathname;
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-white shadow-sm border-b">
      <div className="font-extrabold text-2xl tracking-wide text-blue-700 flex items-center gap-2">
        <span role="img" aria-label="logo">✨</span> CRUD UI Generator
      </div>
      <div className="space-x-4">
        <Link to="/" className={`text-blue-600 hover:underline font-medium ${currentPath === '/' ? 'underline' : ''}`}>Dashboard</Link>
        <Link to="/settings" className={`text-blue-600 hover:underline font-medium ${currentPath === '/settings' ? 'underline' : ''}`}>Settings</Link>
      </div>
    </header>
  );
}

function DashboardWithRouting() {
  const navigate = useNavigate();
  return <Dashboard resources={defaultConfig.resources} onSelectResource={res => navigate(`/resource/${res.name}`)} />;
}

function ResourcePageWithRouting() {
  const { name } = useParams();
  const resource = defaultConfig.resources.find(r => r.name === name);
  if (!resource) return <div className="text-red-500">Resource not found.</div>;
  return <ResourcePage resource={resource} />;
}

export default App;
