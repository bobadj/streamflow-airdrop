import type { StreamflowDistributorSchema } from "../utils/definitions";

class SteamflowService {
  private readonly baseUrl: string =
    "https://staging-api-public.streamflow.finance/v2/api";

  private async fetch<T>(
    path: string = "",
    params: Record<string, string | number | string[]>
  ): Promise<T> {
    const searchParams = new URLSearchParams({
      ...Object.entries(params).reduce((acc, [k, v]) => {
        acc[k] = Array.isArray(v) ? v.join(",") : String(v);
        return acc;
      }, {} as Record<string, string>),
    });

    const url = `${this.baseUrl}/${path}?${searchParams.toString()}`;
    const res = await fetch(url);
    const json = await res.json();

    return json as T;
  }

  async fetchDistributors(addresses: string[]) {
    return this.fetch<Array<StreamflowDistributorSchema>>("airdrops", {
      addresses,
    });
  }
}

const steamflowService = new SteamflowService();

export default steamflowService;
