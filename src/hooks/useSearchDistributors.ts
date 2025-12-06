import type {
  ISearchDistributors,
  MerkleDistributor,
} from "@streamflow/distributor/solana";
import { useQuery } from "@tanstack/react-query";
import { solanaDistributorClient } from "../lib/steamflow";
import type { IProgramAccount } from "@streamflow/common";

export const useSearchDistributors = (
  params: ISearchDistributors = {}
): {
  distributors: Array<IProgramAccount<MerkleDistributor>>;
  isLoading: boolean;
} => {
  const { data: distributors, isLoading } = useQuery({
    queryKey: ["distributors", params.admin, params.mint],
    queryFn: async () => {
      const now = Math.floor(Date.now() / 1000);

      const allDistributors = await solanaDistributorClient.searchDistributors(
        params
      );

      return allDistributors.filter((distributor) => {
        const a = distributor.account;

        const active =
          !a.clawedBack &&
          a.startTs.toNumber() <= now &&
          now <= a.endTs.toNumber();

        const claimable =
          a.totalAmountClaimed.lt(a.maxTotalClaim) &&
          a.numNodesClaimed.lt(a.maxNumNodes);

        const hasClaims =
          a.claimsLimit === 0 || a.claimsLimit > a.numNodesClaimed.toNumber();

        return (
          active && claimable && hasClaims && a.totalAmountLocked.toNumber() > 0
        );
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    distributors: distributors || [],
    isLoading,
  };
};
