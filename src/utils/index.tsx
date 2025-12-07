import type { MerkleDistributor } from "@streamflow/distributor/solana";
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
 * returns "instant" or "vesting" based on distributor data
 */
export function getAirdropTypeFromDistributor(
  distributor: Omit<MerkleDistributor, "toJSON">
): AirdropType {
  const start = Number(distributor.startTs);
  const end = Number(distributor.endTs);

  const totalLocked = distributor.totalAmountLocked.toNumber() ?? 0;

  if (start === end) return "instant";
  if (totalLocked === 0) return "instant";

  return "vesting";
}
