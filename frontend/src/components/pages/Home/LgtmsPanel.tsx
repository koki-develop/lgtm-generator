import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useCallback, useEffect, useState } from 'react';
import LgtmCardList from '~/components/model/lgtm/LgtmCardList';
import LgtmForm from '~/components/model/lgtm/LgtmForm';
import Field from '~/components/utils/Field';
import Loading from '~/components/utils/Loading';
import Modal from '~/components/utils/Modal';
import {
  useCreateLgtmFromBase64,
  useFetchLgtms,
  useLgtms,
} from '~/hooks/lgtmHooks';
import { useTranslate } from '~/hooks/translateHooks';
import { DataUrl } from '~/lib/dataUrl';
import { ImageFile, useLoadImage } from '~/lib/imageFileReader';
import UploadButton from './UploadButton';

type LgtmsPanelProps = {
  show: boolean;
};

const LgtmsPanel: React.VFC<LgtmsPanelProps> = React.memo(props => {
  const { show } = props;

  const lgtms = useLgtms();
  const [openConfirmForm, setOpenConfirmForm] = useState<boolean>(false);
  const [previewImageFile, setPreviewImageFile] = useState<ImageFile | null>(
    null,
  );

  const { t } = useTranslate();
  const { fetchLgtms, loading, isTruncated } = useFetchLgtms();
  const { createLgtmFromBase64, loading: uploading } =
    useCreateLgtmFromBase64();
  const { loadImage, loading: loadingImage } = useLoadImage();

  const handleCloseConfirmForm = useCallback(() => {
    setOpenConfirmForm(false);
  }, []);

  const handleChangeFile = useCallback(
    (file: File) => {
      loadImage(file).then(imageFile => {
        if (!imageFile) return;
        setPreviewImageFile(imageFile);
        setOpenConfirmForm(true);
      });
    },
    [loadImage],
  );

  const handleConfirm = useCallback(() => {
    createLgtmFromBase64(
      new DataUrl(previewImageFile.dataUrl).toBase64(),
      previewImageFile.type,
    ).then(() => {
      setOpenConfirmForm(false);
    });
  }, [createLgtmFromBase64, previewImageFile?.dataUrl, previewImageFile?.type]);

  const handleClickMore = useCallback(() => {
    fetchLgtms(lgtms.slice(-1)[0]?.id);
  }, [fetchLgtms, lgtms]);

  useEffect(() => {
    fetchLgtms();
  }, [fetchLgtms]);

  return (
    <Box data-testid='lgtms-panel' hidden={!show}>
      <Modal open={loadingImage}>
        <Loading text={t.LOADING} />
      </Modal>
      <UploadButton onChange={handleChangeFile} />

      <LgtmForm
        loading={uploading}
        previewSrc={previewImageFile?.dataUrl}
        open={openConfirmForm}
        onClose={handleCloseConfirmForm}
        onConfirm={handleConfirm}
      />

      <Field>
        <LgtmCardList ids={lgtms.map(lgtm => lgtm.id)} />
      </Field>

      <Field sx={{ display: 'flex', justifyContent: 'center' }}>
        {loading && <Loading />}
        {!loading && isTruncated && (
          <Button color='primary' onClick={handleClickMore}>
            {t.SEE_MORE}
          </Button>
        )}
      </Field>
    </Box>
  );
});

LgtmsPanel.displayName = 'LgtmsPanel';

export default LgtmsPanel;
