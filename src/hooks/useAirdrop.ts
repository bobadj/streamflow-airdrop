import { useQuery } from "@tanstack/react-query";
import { solanaDistributorClient } from "../utils";
import type { MerkleDistributorWithMeta } from "../utils/definitions";
import streamflowService from "../services/streamflow.service";

export const useAirdrop = (
  address: string | undefined
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
      if (address) {
        const result = await solanaDistributorClient.getDistributors({
          ids: [address],
        });
        const distributor = (result?.[0] || null) as MerkleDistributorWithMeta;

        if (distributor) {
          distributor.meta = await streamflowService.getDistributor(address);
        }

        return distributor;
      }

      return null;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!address,
  });

  return {
    airdrop: airdrop || null,
    isLoading,
    error,
  };
};
