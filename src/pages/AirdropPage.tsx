import { useMemo, type FC } from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { getNumberFromBN } from "@streamflow/common";
import { useAirdrop } from "../hooks/useAirdrop";
import { Loader } from "../components/ui/Loader";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { StatsCard } from "../components/StatsCard";
import { getAirdropTypeFromDistributor, shortenPublicKey } from "../utils";
import { Icon } from "../components/ui/Icon";
import { useTokenInfo } from "../hooks/useTokenInfo";

export const AirdropPage: FC = () => {
  const params = useParams();
  const { connected } = useWallet();

  const { isLoading, airdrop, error } = useAirdrop(params.distributorId!);
  const { tokenInfo } = useTokenInfo(airdrop?.mint);

  const type = useMemo(() => {
    if (airdrop) {
      return getAirdropTypeFromDistributor(airdrop);
    }
    return "";
  }, [airdrop]);

  if (isLoading) return <Loader />;

  if (error || !airdrop) {
    return <div>Could not find airdrop</div>;
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          {
            label: `Airdrop ${airdrop?.meta?.name || params.distributorId}`,
          },
        ]}
      />
      <div className="flex items-center gap-3 mb-3">
        <p className="text-lg font-bold text-white">
          {shortenPublicKey(airdrop.mint.toBase58())}
        </p>
        <p className="text-lg font-bold text-white">
          Sender {shortenPublicKey(airdrop.admin.toBase58())}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Airdrop Type"
          value={type}
          icon={<Icon title="calendar_month" />}
        />
        <StatsCard
          title="Recipients"
          value={airdrop.maxNumNodes.toString()}
          icon={<Icon title="group" />}
        />
        <StatsCard
          title="Recipients claimed/Total"
          value={[
            airdrop.numNodesClaimed.toString(),
            airdrop.maxNumNodes.toString(),
          ].join("/")}
          icon={<Icon title="group_work" />}
        />
        <StatsCard
          title="Amount claimed/Total"
          value={[
            getNumberFromBN(
              airdrop.totalAmountClaimed,
              tokenInfo?.decimals || 9
            ),
            getNumberFromBN(
              type === "instant"
                ? airdrop.maxTotalClaim
                : airdrop.totalAmountLocked,
              tokenInfo?.decimals || 9
            ),
          ].join("/")}
          icon={<Icon title="token" />}
        />
      </div>
      {!connected ? (
        <div className="mx-auto text-center my-5">
          <p className="text-2xl font-bold text-white mb-4">
            Connect wallet to claim
          </p>
          <p className="text-sm text-gray-400">
            Connect your wallet to see if you are eligible to claim this
            airdrop.
          </p>
        </div>
      ) : (
        <button
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
        </button>
      )}
    </>
  );
};
