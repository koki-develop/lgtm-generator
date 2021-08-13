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
  const [loading, setLoading] = useState<boolean>(false);
  const [openConfirmForm, setOpenConfirmForm] = useState<boolean>(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>();

  const handleCloseConfirmForm = () => {
    setOpenConfirmForm(false);
  };

  const handleChangeFile = (file: File) => {
    setLoading(true);
    ImageFileReader.readAsDataUrl(file).then(dataUrl => {
      setLoading(false);
      setPreviewDataUrl(dataUrl);
      setOpenConfirmForm(true);
    });
  };

  return (
    <Box>
      <Modal open={loading}>
        <Loading text='読込中' />
      </Modal>
      <UploadButton onChange={handleChangeFile} />
      <ConfirmForm
        previewDataUrl={previewDataUrl}
        open={openConfirmForm}
        onClose={handleCloseConfirmForm}
      />
    </Box>
  );
};

export default LgtmsPanel;
