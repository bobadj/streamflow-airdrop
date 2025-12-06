import type { MerkleDistributorJSON } from "@streamflow/distributor/solana";
import type { AirdropType } from "./definitions";

/**
 * Shortens an public key like 0x123456...abcd
 *
 * @param {string} pubKey - the public key to shorten
 * @param {number} charsStart - how many chars to show at the start
 * @param {number} charsEnd - how many chars to show at the end
 *
 * @returns {string}
 */
export function shortenPublicKey(
  pubKey: string,
  charsStart: number = 6,
  charsEnd: number = 4
) {
  if (!pubKey) return "";
  if (pubKey.length <= charsStart + charsEnd + 3) {
    return pubKey;
  }
  const start = pubKey.slice(0, charsStart);
  const end = pubKey.slice(-charsEnd);
  return `${start}...${end}`;
}

/**
 * Chunks array
 */
export function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * returns "instant" or "vesting" based on unlockPeriod and totalAmountLocked
 */
export function getAirdropType({
  totalAmountLocked,
  startVestingTs,
  endVestingTs,
  claimsLimit,
}: {
  totalAmountLocked: string;
  startVestingTs: number;
  endVestingTs: number;
  claimsLimit: number | null;
}): AirdropType {
  const locked = Number(totalAmountLocked);
  const start = startVestingTs;
  const end = endVestingTs;

  if (locked > 0) return "vesting";
  if (start !== end) return "vesting";
  if (Number(claimsLimit) > 1) return "vesting";

  return "instant";
}

/**
 * returns "instant" or "vesting" based on distributor data
 */
export function getAirdropTypeFromDistributor(
  distributor: MerkleDistributorJSON
): AirdropType {
  const locked = +distributor.totalAmountLocked;
  const start = distributor.startTs;
  const end = distributor.endTs;
  const claimsLimit = distributor.claimsLimit;
  const unlockPeriod = +distributor.unlockPeriod;

  if (locked > 0) return "vesting";
  if (start !== end) return "vesting";
  if (claimsLimit > 1) return "vesting";
  if (unlockPeriod > 1) return "vesting";

  // Otherwise it's instant
  return "instant";
}

export function formatTokenAmount(
  amount: string | number,
  decimals: number = 9
): number {
  return Number(amount) / 10 ** decimals;
}
