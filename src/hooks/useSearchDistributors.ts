import {
  MerkleDistributor,
  type ISearchDistributors,
} from "@streamflow/distributor/solana";
import { useQuery } from "@tanstack/react-query";
import type { IProgramAccount } from "@streamflow/common";
import { solanaDistributorClient } from "../lib/steamflow";

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

      return allDistributors
        .filter((distributor) => {
          const a = distributor.account;

          const start = Number(a.startTs);
          const end = Number(a.endTs);

          if (now < start) return false;
          if (now > end) return false;
          return true;
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
