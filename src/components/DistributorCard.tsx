import { type FC, useMemo } from "react";
import classNames from "classnames";
import type { MerkleDistributorJSON } from "@streamflow/distributor/solana";
import { PublicKey } from "@solana/web3.js";
import { getAirdropTypeFromDistributor, shortenPublicKey } from "../utils";
import { useTokenInfo } from "../hooks/useTokenInfo";

interface DistributorCardProps extends MerkleDistributorJSON {
  /** Optional class name for custom styling */
  className?: string;
}

export const DistributorCard: FC<DistributorCardProps> = ({
  className = "",
  ...distributor
}) => {
  const { tokenInfo } = useTokenInfo(new PublicKey(distributor.mint));

  const airdropType = useMemo(
    () => getAirdropTypeFromDistributor(distributor),
    [distributor]
  );

  const formatTokenAmount = (amount: string): number => {
    try {
      return Number(amount) / 10 ** (tokenInfo?.decimals || 9);
    } catch (error) {
      console.error("Error formatting token amount:", error);
      return 0;
    }
  };

  return (
    <div
      className={classNames(
        'cursor-pointer bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl" p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group',
        className
      )}
      role="button"
      tabIndex={0}
      aria-label={`${airdropType} airdrop details`}
    >
      <div className="grid grid-cols-4 gap-4 text-lg font-bold text-white">
        <div>{shortenPublicKey(distributor.mint)}</div>
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
            {formatTokenAmount(distributor.totalAmountClaimed)}/
            {formatTokenAmount(distributor.totalAmountLocked)}
          </div>
        </div>
      </div>
    </div>
  );
};
