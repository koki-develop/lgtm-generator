import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { Button, CardActions, CardContent, Typography } from '@mui/material';
import { useTranslate } from '~/hooks/translateHooks';
import { Routes } from '~/routes';
import ModalCard from '~/components/utils/ModalCard';
import ExternalLink from '~/components/utils/ExternalLink';
import LoadableButton from '~/components/utils/LoadableButton';

const StyledImg = styled('img')({});

type ConfirmFormProps = {
  previewSrc: string;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmForm: React.VFC<ConfirmFormProps> = React.memo(props => {
  const { previewSrc, open, loading, onClose, onConfirm } = props;
  const { t, locale } = useTranslate();

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
        <Typography>{t.CONFIRM_GENERATION}</Typography>
        <StyledImg
          src={previewSrc}
          alt='preview'
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            my: 2,
            maxHeight: 300,
            maxWidth: '100%',
          }}
        />
        {/* FIXME: リファクタ */}
        {locale === 'en' && (
          <Typography>
            Please read {'"'}
            <ExternalLink
              href={Routes.precautions}
              sx={{
                color: theme => theme.palette.primary.main,
                textDecoration: 'underline',
              }}
            >
              {t.PRECAUTIONS}
            </ExternalLink>
            {'"'} before generating LGTM image.
          </Typography>
        )}
        {locale === 'ja' && (
          <Typography>
            LGTM 画像を生成する前に
            <ExternalLink
              href={Routes.precautions}
              sx={{
                color: theme => theme.palette.primary.main,
                textDecoration: 'underline',
              }}
            >
              {t.PRECAUTIONS}
            </ExternalLink>
            をお読みください。
          </Typography>
        )}
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
          fullWidth
          color='primary'
          loading={loading}
          onClick={onConfirm}
        >
          {t.GENERATE}
        </LoadableButton>
      </CardActions>
    </ModalCard>
  );
});

ConfirmForm.displayName = 'ConfirmForm';

export default ConfirmForm;
