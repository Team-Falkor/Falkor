import {
  ITADGameInfo,
  ITADGameLookup,
  ITADGameSearch,
  ITADPrice,
} from "@/utils/api/itad/types";
import { Body, FetchOptions, Response } from "@tauri-apps/api/http";
import { BaseApi } from "../baseApi";

const { VITE_ITAD_API_KEY } = import.meta.env;

class ITAD extends BaseApi {
  protected readonly baseUrl: string = "https://api.isthereanydeal.com";
  protected readonly apiKey: string;

  constructor() {
    super();
    if (!VITE_ITAD_API_KEY)
      throw new Error("VITE_ITAD_API_KEY is not set, cannot use ITAD");
    this.apiKey = VITE_ITAD_API_KEY ?? "";
  }

  async gameSearch(query: string): Promise<ITADGameSearch[]> {
    const response = await this.request<ITADGameSearch[]>(
      "games/search/v1",
      {
        method: "GET",
      },
      {
        title: query,
      }
    );

    return response.data;
  }

  async gameLookup(id: string | number): Promise<ITADGameLookup> {
    const response = await this.request<ITADGameLookup>(
      "games/lookup/v1",
      { method: "GET" },
      typeof id === "string" ? { title: id } : { appid: id.toString() }
    );

    return response.data;
  }

  async gameInfo(id: string): Promise<ITADGameInfo> {
    const response = await this.request<ITADGameInfo>(
      "games/info/v2",
      { method: "GET" },
      { id: id }
    );

    return response.data;
  }

  async gamePrices(id: string[], country = "US"): Promise<ITADPrice[]> {
    const response = await this.request<ITADPrice[]>(
      "games/prices/v2",
      {
        method: "POST",
        body: Body.json(id),
      },
      {
        country: country,
        capacity: "8",
        nondeals: "true",
        vouchers: "true",
      }
    );

    return response.data;
  }

  async request<T = unknown>(
    url: string,
    options: FetchOptions,
    params: Record<string, string> = {}
  ): Promise<Response<T>> {
    try {
      const real_url = new URL(url, this.baseUrl);
      real_url.searchParams.set("key", this.apiKey);

      for (const [key, value] of Object.entries(params)) {
        real_url.searchParams.set(key, value);
      }

      return await this.makeReq<T>(real_url.href, options);
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to fetch ${url}: ${error}`);
    }
  }
}

const itad = new ITAD();
export { itad };
