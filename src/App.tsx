import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import Dashboard from './containers/Dashboard';
import ResourcePage from './containers/ResourcePage';
import SettingsPage from './containers/SettingsPage';
import defaultConfig from './config/defaultConfig';
import Sidebar from './components/Sidebar';
import './App.css';

const resourceRoutes = [
  { name: 'levels', label: 'Levels' },
  { name: 'courses', label: 'Courses' },
  { name: 'trainings', label: 'Trainings' },
  { name: 'questions', label: 'Questions' },
  { name: 'grandQuiz', label: 'Grand Quiz' },
];

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
              {resourceRoutes.map(r => (
                <Route key={r.name} path={`/${r.name}`} element={<ResourcePageWithRouting resourceName={r.name} />} />
              ))}
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
          <footer className="text-center text-xs text-gray-400 py-4 border-t bg-white">
            &copy; {new Date().getFullYear()} Teacher Training Platform. Crafted with <span role="img" aria-label="sparkles">✨</span> by a Senior Frontend Engineer.
          </footer>
        </div>
      </div>
    </Router>
  );
};

function SidebarWithRouting() {
  const navigate = useNavigate();
  const resources = defaultConfig.resources;
  const currentPath = window.location.pathname.replace(/^\//, '');
  return (
    <Sidebar
      resources={resources}
      currentView={currentPath || 'levels'}
      onSelectResource={res => navigate(`/${res.name}`)}
      onSettings={() => navigate('/settings')}
    />
  );
}

function HeaderWithRouting() {
  const currentPath = window.location.pathname.replace(/^\//, '');
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-white shadow-sm border-b">
      <div className="font-extrabold text-2xl tracking-wide text-blue-700 flex items-center gap-2">
        <span role="img" aria-label="logo">🎓</span> Teacher Training Platform
      </div>
      <div className="space-x-4">
        {resourceRoutes.map(r => (
          <Link key={r.name} to={`/${r.name}`} className={`text-blue-600 hover:underline font-medium ${currentPath === r.name ? 'underline' : ''}`}>{r.label}</Link>
        ))}
        <Link to="/settings" className={`text-blue-600 hover:underline font-medium ${currentPath === 'settings' ? 'underline' : ''}`}>Settings</Link>
      </div>
    </header>
  );
}

function DashboardWithRouting() {
  const navigate = useNavigate();
  return <Dashboard resources={defaultConfig.resources} onSelectResource={res => navigate(`/${res.name}`)} />;
}

function ResourcePageWithRouting({ resourceName }: { resourceName: string }) {
  const resource = defaultConfig.resources.find(r => r.name === resourceName);
  if (!resource) return <div className="text-red-500">Resource not found.</div>;
  return <ResourcePage resource={resource} />;
}

export default App;
