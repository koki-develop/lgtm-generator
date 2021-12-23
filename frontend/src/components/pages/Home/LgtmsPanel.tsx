import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ImageFile } from '~/lib/imageFileReader';
import { DataUrl } from '~/lib/dataUrl';
import UploadButton from './UploadButton';
import LgtmCardList from '~/components/model/lgtm/LgtmCardList';
import LgtmForm from '~/components/model/lgtm/LgtmForm';
import {
  useCreateLgtmFromBase64,
  useFetchLgtms,
  useLgtms,
} from '~/components/model/lgtm/LgtmHooks';
import { useLoadImage } from '~/lib/imageFileReader';
import Loading from '~/components/utils/Loading';
import Modal from '~/components/utils/Modal';

type LgtmsPanelProps = {
  show: boolean;
};

const LgtmsPanel: React.VFC<LgtmsPanelProps> = React.memo(props => {
  const { show } = props;

  const lgtms = useLgtms();
  const [openConfirmForm, setOpenConfirmForm] = useState<boolean>(false);
  const [previewImageFile, setPreviewImageFile] = useState<ImageFile>();

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
    <Box hidden={!show}>
      <Modal open={loadingImage}>
        <Loading text='読込中' />
      </Modal>
      <UploadButton onChange={handleChangeFile} />

      <LgtmForm
        loading={uploading}
        previewSrc={previewImageFile?.dataUrl}
        open={openConfirmForm}
        onClose={handleCloseConfirmForm}
        onConfirm={handleConfirm}
      />

      <LgtmCardList ids={lgtms.map(lgtm => lgtm.id)} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
        }}
      >
        {loading && <Loading />}
        {!loading && isTruncated && (
          <Button color='primary' variant='contained' onClick={handleClickMore}>
            もっと見る
          </Button>
        )}
      </Box>
    </Box>
  );
});

LgtmsPanel.displayName = 'LgtmsPanel';

export default LgtmsPanel;
