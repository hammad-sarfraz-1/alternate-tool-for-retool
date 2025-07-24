import React from "react";
import { App } from "../data/apps";

interface AppCardProps {
  app: App;
  onClick?: () => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, onClick }) => (
  <div
    className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition border border-gray-100 flex flex-col justify-between"
    onClick={onClick}
    tabIndex={0}
    role="button"
    aria-label={`Open app ${app.name}`}
  >
    <div className="text-xl font-bold text-blue-700 mb-2">{app.name}</div>
    <div className="text-xs text-gray-400">ID: {app.id}</div>
  </div>
);

export default AppCard;
