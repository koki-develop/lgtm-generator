import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { Button, CardActions, CardContent, Typography } from '@mui/material';
import { useTranslate } from '~/hooks/translateHooks';
import ModalCard from '~/components/utils/ModalCard';
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
  const { t } = useTranslate();

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
        {t.PLEASE_READ_PRECAUTIONS}
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
          data-testid='lgtm-form-generate-button'
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
