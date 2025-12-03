import type { FC, ReactElement } from "react";
import type { IconProps } from "./ui/Icon";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  icon?: ReactElement<IconProps>;
}

export const StatsCard: FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 p-3 rounded-xl border border-cyan-500/20">
          {icon}
        </div>
        {change && (
          <span className="text-green-500 text-sm font-medium bg-green-500/10 px-2 py-1 rounded-lg">
            {change}
          </span>
        )}
      </div>
      <h3 className="text-slate-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
};
