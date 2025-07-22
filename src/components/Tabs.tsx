import React from 'react';

interface TabsProps {
  tabs: string[];
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const Tabs: React.FunctionComponent<TabsProps> = ({ tabs, currentTab, onTabChange }) => (
  <div className="flex space-x-2 border-b mb-4">
    {tabs.map((tab) => (
      <button
        key={tab}
        className={`px-4 py-2 -mb-px border-b-2 font-medium ${currentTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-600'}`}
        onClick={() => onTabChange(tab)}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default Tabs;
