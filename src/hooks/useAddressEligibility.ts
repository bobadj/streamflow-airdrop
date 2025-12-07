import { useQuery } from "@tanstack/react-query";
import streamflowService from "../services/streamflow.service";
import type { StreamflowEligibilitySchema } from "../utils/definitions";
import type { PublicKey } from "@solana/web3.js";

/**
 * get eligibility for a specific address
 */
export const useAddressEligibility = (
  address: PublicKey | null
): {
  eligibilities: Array<StreamflowEligibilitySchema>;
  isLoading: boolean;
} => {
  const { data: eligibilities, isLoading } = useQuery({
    queryKey: ["eligibilities", address?.toBase58()],
    queryFn: async () => {
      if (address) {
        return await streamflowService.getEligibilityForAddress(
          address?.toBase58()
        );
      }

      return [];
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!address,
  });

  return {
    eligibilities: eligibilities || [],
    isLoading,
  };
};
