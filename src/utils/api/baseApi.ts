import { http } from "@tauri-apps/api";
import { FetchOptions, Response } from "@tauri-apps/api/http";

export class BaseApi {
  async makeReq<T = unknown>(
    url: string,
    options: FetchOptions = {
      method: "GET",
    }
  ): Promise<Response<T>> {
    try {
      return await http.fetch<T>(url, options);
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to fetch ${url}: ${error}`);
    }
  }
}
