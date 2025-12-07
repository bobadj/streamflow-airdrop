import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Connection, PublicKey } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";
import { DEVNET_RPC } from "../utils/definitions";

const connection = new Connection(DEVNET_RPC);

export const useTokenInfo = (mintPubkey: PublicKey | string | undefined) => {
  const mintKey = useMemo(() => {
    return typeof mintPubkey === "string"
      ? new PublicKey(mintPubkey)
      : mintPubkey;
  }, [mintPubkey]);

  const { data: tokenInfo, isLoading } = useQuery({
    queryKey: ["tokenInfo", mintKey?.toBase58()],
    queryFn: async () => {
      // SOL special case
      if (
        mintKey?.toBase58() === "So11111111111111111111111111111111111111112"
      ) {
        return {
          decimals: 9,
        };
      }

      return await getMint(connection, mintKey!);
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!mintPubkey,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    tokenInfo,
    isLoading,
  };
};
