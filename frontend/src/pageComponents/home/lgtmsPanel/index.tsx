import React, { useState } from 'react';
import { ImageFileReader } from '~/lib/imageFileReader';
import {
  Box,
} from '@material-ui/core';
import UploadButton from './uploadButton';
import ConfirmForm from '../confirmForm';
import Loading from '~/components/loading';
import Modal from '~/components/modal';

const LgtmsPanel: React.VFC = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [openConfirmForm, setOpenConfirmForm] = useState<boolean>(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>();

  const handleCloseConfirmForm = () => {
    setOpenConfirmForm(false);
  };

  const handleChangeFile = (file: File) => {
    setLoadingImage(true);
    ImageFileReader.readAsDataUrl(file).then(dataUrl => {
      setLoadingImage(false);
      setPreviewDataUrl(dataUrl);
      setOpenConfirmForm(true);
    });
  };

  const handleConfirm = () => {
    setUploading(true);
    new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 3000);
    }).then(() => {
      setUploading(false);
      setOpenConfirmForm(false);
    });
  };

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
    </Box>
  );
};

export default LgtmsPanel;
