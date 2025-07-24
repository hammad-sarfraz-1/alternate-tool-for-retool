import React from "react";
import { useNavigate } from "react-router-dom";
import { Module } from "../data/apps";

interface ModuleTreeProps {
  modules: Module[];
  appId: string;
  parentPath?: string;
}

const ModuleTree: React.FC<ModuleTreeProps> = ({
  modules,
  appId,
  parentPath = "",
}) => {
  const navigate = useNavigate();
  return (
    <ul className="pl-2">
      {modules.map((mod) => (
        <li key={mod.id} className="mb-2">
          <div
            className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 rounded px-2 py-1"
            onClick={() => navigate(`/app/${appId}/module/${mod.id}`)}
          >
            <span className="font-semibold text-blue-700">{mod.name}</span>
          </div>
          {mod.modules && mod.modules.length > 0 && (
            <ModuleTree
              modules={mod.modules}
              appId={appId}
              parentPath={`${parentPath}/${mod.id}`}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default ModuleTree;
