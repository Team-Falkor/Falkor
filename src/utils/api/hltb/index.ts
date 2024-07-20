import { formatName } from "@/utils/helpers";
import { Body } from "@tauri-apps/api/http";
import { BaseApi } from "../baseApi";

export class HLTB extends BaseApi {
  async search(query: string) {
    const res = await this.makeReq<HLTBSearchResponse>(
      "https://howlongtobeat.com/api/search",
      {
        method: "POST",
        body: Body.json({
          searchType: "games",
          searchTerms: formatName(query).split(" "),
          searchPage: 1,
          size: 100,
        }),
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 6.0; XT1069 Build/MPB24.65-34-3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.105 Mobile Safari/537.36",
          Referer: "https://howlongtobeat.com/",
        },
      }
    );

    return res.data;
  }
}
