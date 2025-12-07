import { useMemo, type FC } from "react";
import classNames from "classnames";
import { getNumberFromBN } from "@streamflow/common";
import type { MerkleDistributor } from "@streamflow/distributor/solana";
import { useTokenInfo } from "../hooks/useTokenInfo";
import { getAirdropTypeFromDistributor, shortenPublicKey } from "../utils";

interface DistributorCardProps {
  className?: string;
  onClick?: () => void;
  distributor: MerkleDistributor;
}

export const DistributorCard: FC<DistributorCardProps> = ({
  className = "",
  onClick,
  distributor,
}) => {
  const { tokenInfo } = useTokenInfo(distributor.mint);

  const type = useMemo(() => {
    return getAirdropTypeFromDistributor(distributor);
  }, [distributor]);

  return (
    <div
      className={classNames(
        "cursor-pointer bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group",
        className
      )}
      role="button"
      tabIndex={0}
      onClick={onClick}
      aria-label={`${type} airdrop details`}
    >
      <div className="grid grid-cols-4 gap-4 text-lg font-bold text-white">
        <div className="flex items-center">
          {shortenPublicKey(distributor.mint.toBase58())}
        </div>
        <div className="flex items-center">
          <span className="capitalize">{type}</span>
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
            {getNumberFromBN(
              distributor.totalAmountClaimed,
              tokenInfo?.decimals || 9
            )}
            /
            {getNumberFromBN(
              type === "instant"
                ? distributor.maxTotalClaim
                : distributor.totalAmountLocked,
              tokenInfo?.decimals || 9
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
