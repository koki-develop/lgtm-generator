import axios from 'axios';
import urlJoin from 'url-join';
import { Lgtm } from '../types/lgtm';

type LgtmRaw = {
  id: string;
  created_at: string;
};

export class ApiClient {
  public static async getLgtms(after?: string): Promise<Lgtm[]> {
    const endpoint = this.buildEndpoint('v1', 'lgtms');
    const response = await axios.get<LgtmRaw[]>(endpoint, { params: { after } });
    return response.data.map(raw => ({
      id: raw.id,
      createdAt: new Date(raw.created_at),
    }));
  }

  private static buildEndpoint(...paths: string[]): string {
    return urlJoin(process.env.NEXT_PUBLIC_API_ORIGIN, ...paths);
  }
}