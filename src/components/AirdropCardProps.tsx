import { useMemo, type FC } from "react";
import classNames from "classnames";
import { Icon } from "./ui/Icon";
import { getAirdropType } from "../utils";
import type { StreamflowDistributorSchema } from "../utils/definitions";

export const AirdropCard: FC<StreamflowDistributorSchema> = ({
  name,
  startVestingTs,
  endVestingTs,
  totalValue,
  totalValueUnlocked,
  maxNumNodes,
  numNodesClaimed,
  claimsLimit,
  totalAmountLocked,
}) => {
  const type = useMemo(() => {
    return getAirdropType({
      totalAmountLocked,
      startVestingTs,
      endVestingTs,
      claimsLimit,
    });
  }, [totalAmountLocked, startVestingTs, endVestingTs, claimsLimit]);

  return (
    <div className="cursor-pointer bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-lg font-bold text-white">{name}</h3>
          </div>
        </div>
        <span
          className={classNames(
            "px-3 py-1 rounded-full text-xs font-medium border capitalize",
            {
              "bg-green-500/10 text-green-500 border-green-500/20":
                type === "vesting",
            },
            {
              "bg-blue-500/10 text-blue-500 border-blue-500/20":
                type === "instant",
            }
          )}
        >
          {type}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Icon title="poker_chip" />
            <span>Amount Claimed / Total</span>
          </div>
          <p className="text-white font-bold">
            {totalValueUnlocked || 0}/{totalValue || 0}
          </p>
        </div>
        <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
            <Icon title="groups" />
            <span>Recipients Claimed / Total</span>
          </div>
          <p className="text-white font-bold">
            {numNodesClaimed.toLocaleString()}/{maxNumNodes.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 flex items-center gap-2">
            <Icon title="calendar_clock" />
            Start
          </span>
          <span className="text-white font-medium">
            {new Date(startVestingTs * 1000).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 flex items-center gap-2">
            <Icon title="trending_up" />
            End
          </span>
          <span className="text-white font-medium">
            {new Date(endVestingTs * 1000).toLocaleString()}
          </span>
        </div>
      </div>

      {/* <button
        className={classNames(
          "w-full py-3 rounded-xl font-medium transition-all",
          {
            "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white":
              connected,
          },
          {
            "bg-slate-700/50 text-slate-400 cursor-not-allowed": !connected,
          }
        )}
      >
        Claim
      </button> */}
    </div>
  );
};
