import { useMemo, type FC } from "react";
import classNames from "classnames";
import { getNumberFromBN } from "@streamflow/common";
import type { MerkleDistributor } from "@streamflow/distributor/solana";
import { useTokenInfo } from "../hooks/useTokenInfo";
import { getAirdropTypeFromDistributor, shortenPublicKey } from "../utils";
import { useWallet } from "@solana/wallet-adapter-react";
import { BN } from "bn.js";

interface DistributorCardProps {
  className?: string;
  onClick?: () => void;
  distributor: MerkleDistributor;
  eligibility?: string;
}

export const DistributorCard: FC<DistributorCardProps> = ({
  className,
  onClick,
  distributor,
  eligibility,
}) => {
  const { connected } = useWallet();
  const { tokenInfo } = useTokenInfo(distributor.mint);

  const type = useMemo(() => {
    return getAirdropTypeFromDistributor(distributor);
  }, [distributor]);

  const claimableAmount = useMemo(() => {
    if (!eligibility) return "0";
    return getNumberFromBN(
      new BN(eligibility),
      tokenInfo?.decimals || 9
    ).toLocaleString();
  }, [eligibility, tokenInfo]);

  const totalAmountClaimed = useMemo(() => {
    if (!distributor?.totalAmountClaimed || !tokenInfo?.decimals) return "0";
    return getNumberFromBN(
      distributor.totalAmountClaimed,
      tokenInfo.decimals
    ).toLocaleString();
  }, [distributor.totalAmountClaimed, tokenInfo]);

  const totalAmountLocked = useMemo(() => {
    const value =
      type === "instant"
        ? distributor.maxTotalClaim
        : distributor.totalAmountLocked;
    if (!value || !tokenInfo?.decimals) return "0";

    return getNumberFromBN(value, tokenInfo?.decimals || 9);
  }, [
    type,
    distributor.maxTotalClaim,
    distributor.totalAmountLocked,
    tokenInfo,
  ]);

  return (
    <div
      className={classNames(
        "cursor-pointer bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group",
        className
      )}
      role="button"
      aria-label={`View ${type} airdrop details`}
      aria-describedby="distributor-amounts"
      tabIndex={0}
      onClick={onClick}
    >
      <div
        className={classNames("grid gap-4 text-lg font-bold text-white", {
          "grid-cols-5": connected,
          "grid-cols-4": !connected,
        })}
      >
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
            {totalAmountClaimed}/{totalAmountLocked}
          </div>
        </div>
        {connected && (
          <div className="text-right">
            <div className="text-sm text-slate-400">Claimable</div>
            <div>{claimableAmount}</div>
          </div>
        )}
      </div>
    </div>
  );
};
