import { useCallback, useState } from 'react';
import { useToast } from '@/components/providers/ToastProvider';
import { ApiClient } from '@/lib/apiClient';
import { ReportType } from '@/types/report';
import { useTranslate } from './translateHooks';

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
  const { t } = useTranslate();

  const sendReport = useCallback(
    async (lgtmId: string, type: ReportType, text: string) => {
      setLoading(true);
      await ApiClient.createReport(lgtmId, type, text)
        .then(() => {
          enqueueSuccess(t.SENT);
        })
        .catch(err => {
          console.error(err);
          enqueueError(t.SENDING_FAILED);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [enqueueError, enqueueSuccess, t.SENDING_FAILED, t.SENT],
  );

  return { sendReport, loading };
};
