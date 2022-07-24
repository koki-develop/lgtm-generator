import axios from 'axios';
import urlJoin from 'url-join';
import { UnsupportedImageFormatError } from '~/lib/errors';
import { Image } from '~/types/image';
import { Lgtm } from '~/types/lgtm';
import { Report, ReportType } from '~/types/report';

type ReportRaw = {
  id: string;
  lgtm_id: string;
  type: ReportType;
  text: string;
  created_at: string;
};

type ErrorResponse = {
  code: string;
};

export class ApiClient {
  public static async getLgtms(options: {
    after?: string;
    random: boolean;
  }): Promise<Lgtm[]> {
    const endpoint = this.buildEndpoint('v1', 'lgtms');
    const { data } = await axios.get<Lgtm[]>(endpoint, {
      params: { after: options.after, random: options.random },
    });
    return data;
  }

  public static async createLgtmFromBase64(
    base64: string,
    contentType: string,
  ): Promise<Lgtm> {
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

  public static async createReport(
    lgtmId: string,
    type: ReportType,
    text: string,
  ): Promise<Report> {
    const endpoint = this.buildEndpoint('v1', 'reports');
    const { data } = await axios.post<ReportRaw>(endpoint, {
      lgtm_id: lgtmId,
      type,
      text,
    });
    return this.reportFromRaw(data);
  }

  private static async createLgtm(
    body: { base64: string; content_type: string } | { url: string },
  ): Promise<Lgtm> {
    const endpoint = this.buildEndpoint('v1', 'lgtms');
    const validateStatus = (status: number) => {
      return (status >= 200 && status < 300) || status === 400;
    };
    // TODO: エラー時の型指定にもっといい書き方無いか？要調査
    const response = await axios.post<Lgtm | ErrorResponse>(endpoint, body, {
      validateStatus,
    });
    if (response.status === 201) {
      const data = response.data as Lgtm;
      return data;
    }
    const data = response.data as ErrorResponse;
    switch (data.code) {
      case 'UNSUPPORTED_IMAGE_FORMAT':
        throw new UnsupportedImageFormatError();
      default:
        throw new Error(data.code);
    }
  }

  private static buildEndpoint(...paths: string[]): string {
    return urlJoin(process.env.NEXT_PUBLIC_API_ORIGIN, ...paths);
  }

  private static reportFromRaw(raw: ReportRaw): Report {
    return {
      ...raw,
      lgtmId: raw.lgtm_id,
      createdAt: new Date(raw.created_at),
    };
  }
}
