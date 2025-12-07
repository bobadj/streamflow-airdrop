import { useMemo, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchDistributors } from "../hooks/useSearchDistributors";
import { Loader } from "../components/ui/Loader";
import { DistributorCard } from "../components/DistributorCard";
import { Icon } from "../components/ui/Icon";
import { Input } from "../components/ui/Input";

export const HomePage: FC = () => {
  const navigation = useNavigate();
  const { isLoading, distributors } = useSearchDistributors();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredDistributors = useMemo(() => {
    return distributors.filter((distributor) => {
      return distributor.publicKey
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [distributors, searchTerm]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="w-full mb-6">
        <Input
          name="search"
          type="search"
          placeholder="Search for airdrop"
          onChange={(value) => setSearchTerm(value as string)}
        />
      </div>
      <div className="flex flex-col gap-6">
        {filteredDistributors.map((airdrop) => (
          <DistributorCard
            key={airdrop.publicKey.toString()}
            distributor={airdrop.account}
            onClick={() =>
              navigation(`/airdrop/${airdrop.publicKey.toString()}`)
            }
          />
        ))}
      </div>

      {filteredDistributors.length === 0 && (
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
