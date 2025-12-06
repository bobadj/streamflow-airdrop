import { ICluster } from "@streamflow/common";
import { SolanaDistributorClient } from "@streamflow/distributor/solana";
import { DEVNET_RPC } from "../utils/definitions";

export const solanaDistributorClient = new SolanaDistributorClient({
  clusterUrl: DEVNET_RPC,
  cluster: ICluster.Devnet,
  apiUrl: DEVNET_RPC,
});
