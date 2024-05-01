import { IGDBReturnDataType } from '@/utils/api/igdb/types';
import { ITADPrice } from '@/utils/api/itad/types';
import { http } from '@tauri-apps/api';
import { Body } from '@tauri-apps/api/http';

const { VITE_TWITCH_CLIENT_ID, VITE_TWITCH_CLIENT_SECRET } = import.meta.env;

export class IGDB {
  private clientId: string = VITE_TWITCH_CLIENT_ID ?? '';
  private clientSecret: string = VITE_TWITCH_CLIENT_SECRET ?? '';
  private clientAccessToken?: string;
  private tokenExpiration: number = 0;

  async getAccessToken() {
    const response = await (
      await fetch(
        `https://id.twitch.tv/oauth2/token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`,
        { method: 'POST' },
      )
    ).json();

    console.log(`Getting a new access token`);

    this.clientAccessToken = response.access_token;
    this.tokenExpiration = Date.now() + response.expires_in * 1000; // Convert to milliseconds
    return this.clientAccessToken;
  }

  checkAndRenewToken = async () => !!(Date.now() >= this.tokenExpiration - 100) && (await this.getAccessToken());

  async search(query: string): Promise<IGDBReturnDataType[]> {
    const data = await this.makeReq<IGDBReturnDataType[]>('games', {
      search: query,
    });

    // filter out none pc games and category !== 0
    return data.filter(
      (game) =>
        game.platforms?.some((platform) => platform.abbreviation === 'PC') &&
        // 0 = main_game
        (game.category === 0 ||
          // 8 = remake
          game.category === 8 ||
          // 9 = remaster
          game.category === 9 ||
          // 10 = expanded_game
          game.category === 10 ||
          // 11 = port
          game.category === 11 ||
          // 12 = fork
          game.category === 12),
    );
  }

  async info(id: string): Promise<IGDBReturnDataType & { itad?: ITADPrice[] }> {
    const igdbData = await this.makeReq<IGDBReturnDataType[]>('games', {
      where: `id = ${id}`,
      limit: '1',
    });

    const item = igdbData[0];

    const returnData: IGDBReturnDataType = {
      ...item,
    };

    return returnData;
  }

  async mostAnticipated(): Promise<IGDBReturnDataType[]> {
    const DateNow = (new Date().getTime() / 1000).toFixed();
    return await this.makeReq<IGDBReturnDataType[]>('games', {
      sort: 'hypes desc',
      where: `platforms.abbreviation = "PC" & hypes != n & first_release_date > ${DateNow}`,
    });
  }

  async topRated(): Promise<IGDBReturnDataType[]> {
    return await this.makeReq<IGDBReturnDataType[]>('games', {
      sort: 'total_rating desc',
      where: `platforms.abbreviation = "PC" & total_rating != n & total_rating > 85 & hypes > 2 & rating_count > 5 & version_parent = null & category = 0`,
    });
  }

  private async makeReq<T = unknown>(
    reqUrl: 'games',
    options: {
      fields?: string[];
      where?: string;
      search?: string;
      sort?: string;
      limit?: string;
      offset?: string;
    },
  ): Promise<T> {
    try {
      await this.checkAndRenewToken();

      const defaultFields = [
        '*',
        'screenshots.*',
        'cover.*',
        'rating',
        'release_dates.*',
        'aggregated_rating',
        'platforms.*',
        'platforms.websites.*',
        'bundles.*',
        'involved_companies.*',
        'involved_companies.company.*',
        'game_engines.*',
        'websites.*',
        'videos.*',
        'genres.*',
        'similar_games.*',
        'similar_games.screenshots.*',
        'similar_games.cover.*',
        'similar_games.genres.*',
        'artworks.*',
      ];

      // Construct the request body
      let requestBody = '';
      const fields = options.fields || [];
      requestBody += `fields ${[...fields, ...defaultFields].join(',')};`;

      if (options.sort) {
        requestBody += ` sort ${options.sort};`;
      }
      if (options.limit) {
        requestBody += ` limit ${options.limit};`;
      }
      if (options.search) {
        requestBody += ` search "${options.search}";`;
      }
      if (options.where) {
        requestBody += ` where ${options.where};`;
      }

      // Add other options as needed

      const res = await http.fetch<T>(`https://api.igdb.com/v4/${reqUrl}`, {
        method: 'POST',
        headers: {
          'Client-ID': this.clientId,
          Authorization: `Bearer ${this.clientAccessToken}`,
        },
        body: requestBody ? Body.text(requestBody) : undefined,
      });

      return await res.data;
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  }
}

const igdb = new IGDB();
export { igdb };
