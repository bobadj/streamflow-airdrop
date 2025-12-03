import type { FC } from "react";
import { Icon } from "./ui/Icon";
import classNames from "classnames";

interface AirdropCardProps {
  name: string;
  symbol: string;
  totalAmount: string;
  recipients: number;
  status: "active" | "upcoming" | "completed";
  startDate: string;
  endDate: string;
  image: string;
}

export const AirdropCard: FC<AirdropCardProps> = ({
  name,
  symbol,
  totalAmount,
  recipients,
  status,
  startDate,
  endDate,
  image,
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full ring-2 ring-slate-700 group-hover:ring-cyan-500/50 transition-all"
          />
          <div>
            <h3 className="text-lg font-bold text-white">{name}</h3>
            <p className="text-sm text-slate-400">{symbol}</p>
          </div>
        </div>
        <span
          className={classNames(
            "px-3 py-1 rounded-full text-xs font-medium border capitalize",
            {
              "bg-green-500/10 text-green-500 border-green-500/20":
                status === "active",
            },
            {
              "bg-blue-500/10 text-blue-500 border-blue-500/20":
                status === "upcoming",
            },
            {
              "bg-slate-500/10 text-slate-500 border-slate-500/20":
                status === "completed",
            }
          )}
        >
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            {/* <Coins className="w-3 h-3" /> */}
            <Icon title="poker_chip" />
            <span>Total Amount</span>
          </div>
          <p className="text-white font-bold">{totalAmount}</p>
        </div>
        <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            {/* <Users className="w-3 h-3" /> */}
            <Icon title="groups" />
            <span>Recipients</span>
          </div>
          <p className="text-white font-bold">{recipients.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 flex items-center gap-2">
            {/* <Clock className="w-4 h-4" /> */}
            <Icon title="calendar_clock" />
            Start
          </span>
          <span className="text-white font-medium">{startDate}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 flex items-center gap-2">
            {/* <TrendingUp className="w-4 h-4" /> */}
            <Icon title="trending_up" />
            End
          </span>
          <span className="text-white font-medium">{endDate}</span>
        </div>
      </div>

      <button
        className={classNames(
          "w-full py-3 rounded-xl font-medium transition-all",
          {
            "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white":
              status === "active",
          },
          {
            "bg-slate-700/50 text-slate-400 cursor-not-allowed":
              status !== "active",
          }
        )}
        disabled={status !== "active"}
      >
        {status === "active"
          ? "Claim Airdrop"
          : status === "upcoming"
          ? "Coming Soon"
          : "Ended"}
      </button>
    </div>
  );
};
