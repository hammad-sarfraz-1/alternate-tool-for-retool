import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import defaultConfig from "../config/defaultConfig";
import ResourcePage from "../containers/ResourcePage";
import Header from "./Header";

const ResourcePageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const resource = defaultConfig.resources.find((r) => r.name === name);
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar
        resources={defaultConfig.resources}
        currentView={name || ""}
        onSelectResource={(res) => navigate(`/resource/${res.name}`)}
        onSettings={() => navigate("/settings")}
      />
      <div className="flex-1 flex flex-col min-h-screen relative overflow-auto">
        <Header />
        <main className="flex-1 max-w-5xl mx-auto w-full py-10 px-6">
          {resource ? (
            <ResourcePage resource={resource} />
          ) : (
            <div className="text-red-500">Resource not found.</div>
          )}
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

export default ResourcePageWrapper;
