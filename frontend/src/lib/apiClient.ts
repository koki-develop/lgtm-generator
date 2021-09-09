import axios from 'axios';
import { CustomError } from 'ts-custom-error';
import urlJoin from 'url-join';
import { Lgtm } from '~/types/lgtm';
import { Image } from '~/types/image';
import {
  Report,
  ReportType,
} from '~/types/report';

type LgtmRaw = {
  id: string;
  created_at: string;
};

type ReportRaw = {
  id: string;
  lgtm_id: string;
  type: ReportType;
  text: string;
  created_at: string;
};

export class UnsupportedImageFormatError extends CustomError {}

export class ApiClient {
  public static async getLgtms(limit: number, after?: string): Promise<Lgtm[]> {
    const endpoint = this.buildEndpoint('v1', 'lgtms');
    const response = await axios.get<LgtmRaw[]>(endpoint, { params: { after, limit } });
    return response.data.map(this.lgtmFromRaw);
  }

  public static async createLgtmFromBase64(base64: string, contentType: string): Promise<Lgtm> {
    return this.createLgtm({ base64, content_type: contentType });
  }

  public static async createLgtmFromUrl(url: string): Promise<Lgtm> {
    return this.createLgtm({ url });
  }

  public static async searchImages(q: string): Promise<Image[]> {
    const endpoint = this.buildEndpoint('v1', 'images');
    const response = await axios.get<Image[]>(endpoint, { params: { q } });
    return response.data;
  }

  public static async createReport(lgtmId: string, type: ReportType, text: string): Promise<Report> {
    const endpoint = this.buildEndpoint('v1', 'reports');
    const response = await axios.post<Report>(endpoint, { lgtm_id: lgtmId, type, text });
    return response.data;
  }

  private static async createLgtm(body: { base64: string, content_type: string } | { url: string }): Promise<Lgtm> {
    const endpoint = this.buildEndpoint('v1', 'lgtms');
    const validateStatus = (status: number) => {
      return status >= 200 && status < 300 || status === 400;
    };
    const response = await axios.post<LgtmRaw>(endpoint, body, { validateStatus });
    if (response.status === 201) {
      return this.lgtmFromRaw(response.data);
    }
    switch (response.data.code) {
      case 'UNSUPPORTED_IMAGE_FORMAT':
        throw new UnsupportedImageFormatError();
        break;
      default:
        throw new Error(response.data.code);
    }
  }

  private static buildEndpoint(...paths: string[]): string {
    return urlJoin(process.env.NEXT_PUBLIC_API_ORIGIN, ...paths);
  }

  private static lgtmFromRaw(raw: LgtmRaw): Lgtm {
    return {
      ...raw,
      createdAt: new Date(raw.created_at),
    };
  }

  private static reportFromRaw(raw: ReportRaw): Report {
    return {
      ...raw,
      lgtmId: raw.lgtm_id,
      createdAt: new Date(raw.created_at),
    };
  }
}
