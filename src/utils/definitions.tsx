import type { MerkleDistributor } from "@streamflow/distributor/solana";

export interface StreamflowDistributorSchema {
  address: string;
  chain: "SOLANA";
  claimsLimit: number | null;
  clawbackDt: string | null;
  createdDt: string;
  csvKey: string;
  endVestingTs: number;
  isActive: boolean;
  isAligned: boolean;
  isOnChain: boolean;
  isPopulated: boolean;
  isVerified: boolean;
  lastDurationUpdateTs: number | null;
  maxNumNodes: string;
  maxTotalClaim: string;
  merkleRoot: number[];
  mint: string;
  name: string;
  numNodesClaimed: string;
  sender: string;
  startVestingTs: number;
  totalAmountClaimed: string;
  totalAmountLocked: string;
  totalAmountUnlocked: string;
  totalClaimablePreUpdate: string;
  totalValue: string;
  totalValueLocked: string;
  totalValueUnlocked: string;
  unlockPeriod: number;
  version: number;
}

export type AirdropType = "instant" | "vesting";

export const DEVNET_RPC = "https://api.devnet.solana.com";

export type MerkleDistributorWithMeta = MerkleDistributor & {
  meta: StreamflowDistributorSchema | null;
};
