import type { FC } from "react";

interface FilterTabsProps {
  activeTab: "all" | "active" | "upcoming" | "completed";
  onTabChange: (tab: "all" | "active" | "upcoming" | "completed") => void;
}

export const FilterTabs: FC<FilterTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "all" as const, label: "All Airdrops" },
    { id: "active" as const, label: "Active" },
    { id: "upcoming" as const, label: "Upcoming" },
    { id: "completed" as const, label: "Completed" },
  ];

  return (
    <div className="flex gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 px-6 py-2.5 rounded-lg font-medium transition-all ${
            activeTab === tab.id
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
              : "text-slate-400 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
