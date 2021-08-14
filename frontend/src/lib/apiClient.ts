import axios from 'axios';
import urlJoin from 'url-join';
import { Lgtm } from '~/types/lgtm';

type LgtmRaw = {
  id: string;
  created_at: string;
};

export class ApiClient {
  public static async getLgtms(after?: string): Promise<Lgtm[]> {
    const endpoint = this.buildEndpoint('v1', 'lgtms');
    const response = await axios.get<LgtmRaw[]>(endpoint, { params: { after, limit: 20 } });
    return response.data.map(this.lgtmFromRaw);
  }

  public static async createLgtm(base64: string, contentType: string): Promise<Lgtm> {
    const endpoint = this.buildEndpoint('v1', 'lgtms');
    const body = { base64, content_type: contentType };
    const response = await axios.post<LgtmRaw>(endpoint, body);
    return this.lgtmFromRaw(response.data);
  }

  private static buildEndpoint(...paths: string[]): string {
    return urlJoin(process.env.NEXT_PUBLIC_API_ORIGIN, ...paths);
  }

  private static lgtmFromRaw(raw: LgtmRaw): Lgtm {
    return {
      id: raw.id,
      createdAt: new Date(raw.created_at),
    };
  }
}
