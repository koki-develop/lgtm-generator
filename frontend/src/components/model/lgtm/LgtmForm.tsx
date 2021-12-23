import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { Button, CardActions, CardContent, Typography } from '@mui/material';
import { Routes } from '~/routes';
import ModalCard from '~/components/utils/ModalCard';
import ExternalLink from '~/components/utils/ExternalLink';
import LoadableButton from '~/components/utils/LoadableButton';

const PreviewImg = styled('img')(({ theme }) => ({
  border: '1px solid #dddddd',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  maxHeight: 300,
  maxWidth: '100%',
}));

type ConfirmFormProps = {
  previewSrc: string;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmForm: React.VFC<ConfirmFormProps> = React.memo(props => {
  const { previewSrc, open, loading, onClose, onConfirm } = props;

  const handleClose = useCallback(() => {
    if (loading) return;
    onClose();
  }, [loading, onClose]);

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
        <Typography>この画像で LGTM 画像を生成しますか？</Typography>
        <PreviewImg src={previewSrc} alt='preview' />
        <Typography>
          LGTM 画像を生成する前に
          <ExternalLink
            href={Routes.precaution}
            sx={{
              color: theme => theme.palette.primary.main,
              textDecoration: 'underline',
            }}
          >
            ご利用上の注意
          </ExternalLink>
          をお読みください
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          color='secondary'
          variant='contained'
          onClick={handleClose}
          disabled={loading}
        >
          キャンセル
        </Button>
        <LoadableButton
          fullWidth
          color='primary'
          variant='contained'
          loading={loading}
          onClick={onConfirm}
        >
          生成
        </LoadableButton>
      </CardActions>
    </ModalCard>
  );
});

ConfirmForm.displayName = 'ConfirmForm';

export default ConfirmForm;
