import React, { useCallback, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { ReportType } from '~/types/report';
import { useTranslate } from '~/hooks/translateHooks';
import { useSendReport } from '~/hooks/reportHooks';
import ModalCard from '~/components/utils/ModalCard';
import LoadableButton from '~/components/utils/LoadableButton';

const StyledImage = styled('img')({});

type ReportFormProps = {
  lgtmId: string;
  open: boolean;
  onClose: () => void;
  imgSrc: string;
};

const ReportForm: React.VFC<ReportFormProps> = React.memo(props => {
  const { lgtmId, imgSrc, open, onClose } = props;

  const [type, setType] = useState<ReportType | null>(null);
  const [text, setText] = useState<string>('');

  const { sendReport, loading } = useSendReport();
  const { t } = useTranslate();

  const isValid: boolean = useMemo(() => {
    if (!Object.values(ReportType).includes(type)) {
      return false;
    }
    if (text.length > 1000) {
      return false;
    }
    return true;
  }, [text.length, type]);

  const handleClose = useCallback(() => {
    if (loading) return;
    onClose();
  }, [loading, onClose]);

  const handleChangeType = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setType(e.currentTarget.value as ReportType);
    },
    [],
  );

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value);
    },
    [],
  );

  const handleSendReport = useCallback(() => {
    sendReport(lgtmId, type, text).then(() => {
      setText('');
      setType(null);
      onClose();
    });
  }, [lgtmId, onClose, sendReport, text, type]);

  return (
    <ModalCard open={open} onClose={handleClose}>
      <CardContent
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          pt: 0,
        }}
      >
        <StyledImage
          src={imgSrc}
          alt='LGTM'
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            mb: 2,
            maxHeight: 200,
            maxWidth: '100%',
          }}
        />
        <RadioGroup value={type || ''} onChange={handleChangeType}>
          <FormControlLabel
            value={ReportType.illegal}
            control={<Radio value={ReportType.illegal} />}
            label={t.ILLEGAL}
            disabled={loading}
          />
          <FormControlLabel
            value={ReportType.inappropriate}
            control={<Radio value={ReportType.inappropriate} />}
            label={t.INAPPROPRIATE}
            disabled={loading}
          />
          <FormControlLabel
            value={ReportType.other}
            control={
              <Radio
                data-testid='report-form-type-radio-other'
                value={ReportType.other}
              />
            }
            label={t.OTHER}
            disabled={loading}
          />
        </RadioGroup>
        <TextField
          data-testid='report-form-text-input'
          fullWidth
          multiline
          placeholder={t.SUPPLEMENT}
          disabled={loading}
          inputProps={{ maxLength: 1000 }}
          rows={5}
          onChange={handleChangeText}
          value={text}
        />
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          color='secondary'
          onClick={handleClose}
          disabled={loading}
        >
          {t.CANCEL}
        </Button>
        <LoadableButton
          data-testid='report-form-send-button'
          fullWidth
          color='primary'
          disabled={!isValid}
          loading={loading}
          onClick={handleSendReport}
        >
          {t.SEND}
        </LoadableButton>
      </CardActions>
    </ModalCard>
  );
});

ReportForm.displayName = 'ReportForm';

export default ReportForm;
