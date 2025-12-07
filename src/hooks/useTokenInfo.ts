import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";
import { getMint } from "@solana/spl-token";
import { connection } from "../utils";

/**
 * fetch token info
 *
 * @notice uses heavy caching as there is no need to fetch the same data
 */
export const useTokenInfo = (mintPubkey: PublicKey | string | undefined) => {
  const mintKey = useMemo(() => {
    return typeof mintPubkey === "string"
      ? new PublicKey(mintPubkey)
      : mintPubkey;
  }, [mintPubkey]);

  const { data: tokenInfo, isLoading } = useQuery({
    queryKey: ["tokenInfo", mintKey?.toBase58()],
    queryFn: async () => {
      // SOL
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
