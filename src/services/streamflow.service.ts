import type {
  StreamflowClaimantSchema,
  StreamflowDistributorSchema,
  StreamflowEligibilitySchema,
} from "../utils/definitions";

class StreamflowService {
  private readonly baseUrl: string =
    "https://staging-api-public.streamflow.finance/v2/api";

  private async fetch<T>(
    path: string = "",
    params?: Record<string, string | number | string[]>,
    method: "GET" | "POST" = "GET"
  ): Promise<T> {
    const searchParams = new URLSearchParams({
      ...Object.entries(params || {}).reduce((acc, [k, v]) => {
        acc[k] = Array.isArray(v) ? v.join(",") : String(v);
        return acc;
      }, {} as Record<string, string>),
    });

    let url = `${this.baseUrl}/${path}`;
    if (method === "GET") {
      url += `?${searchParams.toString()}`;
    }

    const res = await fetch(url, {
      method,
      ...(method === "POST"
        ? {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
          }
        : {}),
    });
    const json = await res.json();

    return json as T;
  }

  async fetchDistributors(addresses: string[]) {
    return this.fetch<Array<StreamflowDistributorSchema>>("airdrops", {
      addresses,
    });
  }

  async getDistributor(address: string) {
    return await this.fetch<StreamflowDistributorSchema>(`airdrops/${address}`);
  }

  async getIsEligible(distributorAddress: string, claimantAddress: string) {
    return await this.fetch<StreamflowClaimantSchema>(
      `airdrops/${distributorAddress}/claimants/${claimantAddress}`
    );
  }

  async getEligibilityForAddress(address: string) {
    return this.fetch<Array<StreamflowEligibilitySchema>>(
      "airdrops/check-eligibility",
      {
        claimantAddresses: [address],
      },
      "POST"
    );
  }
}

const streamflowService = new StreamflowService();

export default streamflowService;
