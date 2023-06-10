export type Report = {
  id: string;
  lgtmId: string;
  type: ReportType;
  text: string;
  createdAt: Date;
};

export const ReportType = {
  illegal: 'illegal',
  inappropriate: 'inappropriate',
  other: 'other',
} as const;

export type ReportType = typeof ReportType[keyof typeof ReportType];
