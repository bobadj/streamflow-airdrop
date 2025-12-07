import {
  MerkleDistributor,
  type ISearchDistributors,
} from "@streamflow/distributor/solana";
import { useQuery } from "@tanstack/react-query";
import type { IProgramAccount } from "@streamflow/common";
import {
  getAirdropTypeFromDistributor,
  solanaDistributorClient,
} from "../utils";

/**
 * search available airdrops
 */
export const useSearchDistributors = (
  params: ISearchDistributors = {}
): {
  distributors: Array<IProgramAccount<MerkleDistributor>>;
  isLoading: boolean;
} => {
  const { data: distributors, isLoading } = useQuery({
    queryKey: ["distributors", params.admin, params.mint],
    queryFn: async () => {
      const allDistributors = await solanaDistributorClient.searchDistributors(
        params
      );

      return allDistributors
        .filter((distributor) => {
          const d = distributor.account;

          let val = d.totalAmountLocked;
          if (getAirdropTypeFromDistributor(d) === "instant") {
            val = d.maxTotalClaim;
          }
          return d.totalAmountClaimed.lt(val);
        })
        .sort((a, b) => {
          const aStart = Number(a.account.startTs);
          const bStart = Number(b.account.startTs);
          return bStart - aStart;
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
