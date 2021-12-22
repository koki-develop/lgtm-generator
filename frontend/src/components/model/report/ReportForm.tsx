import React, { useMemo } from 'react';
import {
  Button,
  CardActions,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReportType } from '~/types/report';
import ModalCard from '~/components/utils/ModalCard';
import LoadableButton from '~/components/utils/LoadableButton';

const LgtmImage = styled('img')(({ theme }) => ({
  border: '1px solid #dddddd',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  maxHeight: 200,
  maxWidth: '100%',
}));

export type Values = {
  type?: ReportType;
  text: string;
};

type ReportFormProps = {
  open: boolean;
  onClose: () => void;
  imgSrc: string;
  loading: boolean;
  onReport: () => void;
  values: Values;
  onChange: (values: Values) => void;
};

const ReportForm: React.VFC<ReportFormProps> = React.memo(props => {
  const handleClose = () => {
    if (props.loading) {
      return;
    }
    props.onClose();
  };

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({
      ...props.values,
      type: e.currentTarget.value as ReportType,
    });
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange({ ...props.values, text: e.currentTarget.value });
  };

  const isValid: boolean = useMemo(() => {
    if (!Object.values(ReportType).includes(props.values.type)) {
      return false;
    }
    if (props.values.text.length > 1000) {
      return false;
    }
    return true;
  }, [props.values]);

  return (
    <ModalCard open={props.open} onClose={handleClose}>
      <CardContent
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          pt: 0,
        }}
      >
        <LgtmImage src={props.imgSrc} alt='LGTM' />
        <RadioGroup value={props.values.type || ''} onChange={handleChangeType}>
          <FormControlLabel
            value={ReportType.illegal}
            control={<Radio value={ReportType.illegal} />}
            label='法律違反 ( 著作権侵害、プライバシー侵害、名誉毀損等 )'
            disabled={props.loading}
          />
          <FormControlLabel
            value={ReportType.inappropriate}
            control={<Radio value={ReportType.inappropriate} />}
            label='不適切なコンテンツ'
            disabled={props.loading}
          />
          <FormControlLabel
            value={ReportType.other}
            control={<Radio value={ReportType.other} />}
            label='その他'
            disabled={props.loading}
          />
        </RadioGroup>
        <TextField
          fullWidth
          multiline
          variant='outlined'
          placeholder='補足 ( 任意 )'
          disabled={props.loading}
          inputProps={{ maxLength: 1000 }}
          rows={5}
          onChange={handleChangeText}
          value={props.values.text}
        />
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant='contained'
          onClick={handleClose}
          disabled={props.loading}
        >
          キャンセル
        </Button>
        <LoadableButton
          fullWidth
          color='primary'
          variant='contained'
          disabled={!isValid}
          loading={props.loading}
          onClick={props.onReport}
        >
          送信
        </LoadableButton>
      </CardActions>
    </ModalCard>
  );
});

ReportForm.displayName = 'ReportForm';

export default ReportForm;
