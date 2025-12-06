import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchDistributors } from "../hooks/useSearchDistributors";
import { Loader } from "../components/ui/Loader";
import { DistributorCard } from "../components/DistributorCard";
import { Icon } from "../components/ui/Icon";

export const HomePage: FC = () => {
  const navigation = useNavigate();
  const { isLoading, distributors } = useSearchDistributors();

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="flex flex-col gap-6">
        {distributors.map((airdrop) => (
          <DistributorCard
            key={airdrop.publicKey.toString()}
            {...airdrop.account.toJSON()}
            onClick={() =>
              navigation(`/airdrop/${airdrop.publicKey.toString()}`)
            }
          />
        ))}
      </div>

      {distributors.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-12 max-w-md mx-auto">
            <Icon title="poker_chip" />
            <h3 className="text-xl font-bold text-white mb-2">
              No Airdrops Found
            </h3>
            <p className="text-slate-400">
              There are no airdrops at the moment. Check back later!
            </p>
          </div>
        </div>
      )}
    </>
  );
};
