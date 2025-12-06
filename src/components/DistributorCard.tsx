import { type FC, useMemo } from "react";
import classNames from "classnames";
import type { MerkleDistributorJSON } from "@streamflow/distributor/solana";
import { useTokenInfo } from "../hooks/useTokenInfo";
import {
  formatTokenAmount,
  getAirdropTypeFromDistributor,
  shortenPublicKey,
} from "../utils";

interface DistributorCardProps extends MerkleDistributorJSON {
  className?: string;
  onClick?: () => void;
}

export const DistributorCard: FC<DistributorCardProps> = ({
  className = "",
  onClick,
  ...distributor
}) => {
  const { tokenInfo } = useTokenInfo(distributor.mint);

  const airdropType = useMemo(
    () => getAirdropTypeFromDistributor(distributor),
    [distributor]
  );

  return (
    <div
      className={classNames(
        'cursor-pointer bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl" p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group',
        className
      )}
      role="button"
      tabIndex={0}
      onClick={onClick}
      aria-label={`${airdropType} airdrop details`}
    >
      <div className="grid grid-cols-4 gap-4 text-lg font-bold text-white">
        <div className="flex items-center">
          {shortenPublicKey(distributor.mint)}
        </div>
        <div className="flex items-center">
          <span className="capitalize">{airdropType}</span>
        </div>
        <div className="text-center">
          <div className="text-sm text-slate-400">Nodes</div>
          <div>
            {distributor.numNodesClaimed.toString()}/
            {distributor.maxNumNodes.toString()}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-400">Amount</div>
          <div>
            {formatTokenAmount(
              distributor.totalAmountClaimed,
              tokenInfo?.decimals || 9
            )}
            /
            {formatTokenAmount(
              distributor.totalAmountLocked,
              tokenInfo?.decimals || 9
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
