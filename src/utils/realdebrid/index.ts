import { Torrents } from '@/utils/realdebrid/torrents';
import { Unrestrict } from '@/utils/realdebrid/unrestrict';
import { User } from '@/utils/realdebrid/user';

class RealDebridClient {
  // Use RealDebrid Auth to gain the access token and refresh token before making requests
  constructor(accessToken: string) {
    if (!accessToken)
      throw new Error(`Access token not provided. Please obtain one by utilizing the RealDebridAuth class`);

    this.unrestrict = new Unrestrict(accessToken);
    this.user = new User(accessToken);
    this.torrents = new Torrents(accessToken);
  }

  unrestrict: Unrestrict;
  user: User;
  torrents: Torrents;
}

export default RealDebridClient;
