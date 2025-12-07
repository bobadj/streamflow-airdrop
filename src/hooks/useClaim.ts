import { useState } from "react";
import { BN } from "bn.js";
import { useWallet } from "@solana/wallet-adapter-react";
import type { SignerWalletAdapter } from "@solana/wallet-adapter-base";
import { useMutation, useQuery } from "@tanstack/react-query";
import streamflowService from "../services/streamflow.service";
import { solanaDistributorClient } from "../utils";

export const useClaim = (address: string | undefined, maxNumNodes: number) => {
  const { connected, publicKey, wallet } = useWallet();
  const [isEligible, setIsEligible] = useState<boolean>(false);

  const { data: claimantData, isLoading } = useQuery({
    queryKey: ["eligible", address, publicKey?.toBase58()],
    queryFn: async () => {
      if (address && publicKey) {
        try {
          const claimantData = await streamflowService.getIsEligible(
            address,
            publicKey?.toBase58()
          );

          setIsEligible(claimantData?.distributorAddress === address);

          return claimantData;
        } catch {
          return false;
        }
      }

      return false;
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!address && connected,
  });

  const { mutateAsync: claim } = useMutation({
    mutationFn: async () => {
      if (!claimantData || !wallet) return;

      return await solanaDistributorClient.claim(
        {
          id: claimantData.distributorAddress,
          proof: claimantData.proof,
          amountUnlocked: new BN(claimantData.amountUnlocked),
          amountLocked: new BN(claimantData.amountLocked),
          claimableAmount: new BN(+claimantData.amountUnlocked / maxNumNodes), // ??
        },
        {
          invoker: wallet.adapter as SignerWalletAdapter,
        }
      );
    },
  });

  return {
    claim,
    isEligible,
    isLoading,
    connected,
  };
};
