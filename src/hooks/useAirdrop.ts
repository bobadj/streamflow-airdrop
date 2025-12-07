import { useQuery } from "@tanstack/react-query";
import { solanaDistributorClient } from "../lib/steamflow";
import type { MerkleDistributorWithMeta } from "../utils/definitions";
import steamflowService from "../services/steamflow.service";

export const useAirdrop = (
  address: string
): {
  airdrop: MerkleDistributorWithMeta | null;
  isLoading: boolean;
  error: unknown;
} => {
  const {
    data: airdrop,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["airdrop", address],
    queryFn: async () => {
      const result = await solanaDistributorClient.getDistributors({
        ids: [address],
      });
      const distributor = (result?.[0] || null) as MerkleDistributorWithMeta;

      if (distributor) {
        distributor.meta = await steamflowService.getDistributor(address);
      }

      return distributor;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    airdrop: airdrop || null,
    isLoading,
    error,
  };
};
