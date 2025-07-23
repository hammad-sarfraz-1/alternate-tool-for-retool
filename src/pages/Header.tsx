import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
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
};

export default Header; 