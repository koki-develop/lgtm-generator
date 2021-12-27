import { useCallback, useState } from 'react';
import { useToast } from '~/components/providers/ToastProvider';
import { ReportType } from '~/types/report';
import { ApiClient } from '~/lib/apiClient';

export type SendReportFn = (
  lgtmId: string,
  type: ReportType,
  text: string,
) => Promise<void>;

export const useSendReport = (): {
  sendReport: SendReportFn;
  loading: boolean;
} => {
  const [loading, setLoading] = useState<boolean>(false);

  const { enqueueSuccess, enqueueError } = useToast();

  const sendReport = useCallback(
    async (lgtmId: string, type: ReportType, text: string) => {
      setLoading(true);
      await ApiClient.createReport(lgtmId, type, text)
        .then(() => {
          enqueueSuccess('送信しました');
        })
        .catch(err => {
          console.error(err);
          enqueueError('送信に失敗しました');
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [enqueueError, enqueueSuccess],
  );

  return { sendReport, loading };
};
