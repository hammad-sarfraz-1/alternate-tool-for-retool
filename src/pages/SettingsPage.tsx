import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import defaultConfig from "../config/defaultConfig";
import SettingsPage from "../containers/SettingsPage";
import Header from "./Header";

const SettingsPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar
        resources={defaultConfig.resources}
        currentView="settings"
        onSelectResource={(res) => navigate(`/resource/${res.name}`)}
        onSettings={() => navigate("/settings")}
      />
      <div className="flex-1 flex flex-col min-h-screen relative overflow-auto">
        <Header />
        <main className="flex-1 max-w-5xl mx-auto w-full py-10 px-6">
          <SettingsPage />
        </main>
        <footer className="text-center text-xs text-gray-400 py-4 border-t bg-white">
          &copy; {new Date().getFullYear()} CRUD UI Generator. Crafted with{" "}
          <span role="img" aria-label="sparkles">
            ✨
          </span>{" "}
          by a Senior Frontend Engineer.
        </footer>
      </div>
    </div>
  );
};

export default SettingsPageWrapper;
