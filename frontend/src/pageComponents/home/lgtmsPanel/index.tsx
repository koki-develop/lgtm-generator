import React, { useEffect, useState } from 'react';
import { Lgtm } from '~/types/lgtm';
import { ApiClient } from '~/lib/apiClient';
import { ImageFileReader } from '~/lib/imageFileReader';
import { DataUrl } from '~/lib/dataUrl';
import { useToast } from '~/contexts/toastProvider';
import {
  Box,
  Grid,
} from '@material-ui/core';
import UploadButton from './uploadButton';
import LgtmCard from './lgtmCard';
import ConfirmForm from '../confirmForm';
import Loading from '~/components/loading';
import Modal from '~/components/modal';

const LgtmsPanel: React.VFC = React.memo(() => {
  const [lgtms, setLgtms] = useState<Lgtm[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [openConfirmForm, setOpenConfirmForm] = useState<boolean>(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>();
  const [previewContentType, setPreviewContentType] = useState<string>();
  const { enqueueSuccess } = useToast();

  const handleCloseConfirmForm = () => {
    setOpenConfirmForm(false);
  };

  const handleChangeFile = (file: File) => {
    setLoadingImage(true);
    ImageFileReader.readAsDataUrl(file).then(dataUrl => {
      setLoadingImage(false);
      setPreviewDataUrl(dataUrl);
      setPreviewContentType(file.type);
      setOpenConfirmForm(true);
    });
  };

  const handleConfirm = () => {
    setUploading(true);
    ApiClient.createLgtm(new DataUrl(previewDataUrl).toBase64(), previewContentType).then(() => {
      setUploading(false);
      setOpenConfirmForm(false);
      enqueueSuccess('LGTM 画像を生成しました');
    });
  };

  useEffect(() => {
    ApiClient.getLgtms().then(lgtms => {
      setLgtms(lgtms);
    });
  }, []);

  return (
    <Box>
      <Modal open={loadingImage}>
        <Loading text='読込中' />
      </Modal>
      <UploadButton onChange={handleChangeFile} />
      <ConfirmForm
        loading={uploading}
        previewDataUrl={previewDataUrl}
        open={openConfirmForm}
        onClose={handleCloseConfirmForm}
        onConfirm={handleConfirm}
      />

      <Grid
        container
        spacing={2}
      >
        {lgtms.map(lgtm => (
          <Grid
            key={lgtm.id}
            item
            xs={3}
          >
            <LgtmCard
              lgtm={lgtm}
            />
          </Grid>
        ))}
        </Grid>
    </Box>
  );
});

LgtmsPanel.displayName = 'LgtmsPanel';

export default LgtmsPanel;
