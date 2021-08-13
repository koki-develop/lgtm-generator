import React, { useState } from 'react';
import { ImageFileReader } from '~/lib/imageFileReader';
import {
  Box,
} from '@material-ui/core';
import UploadButton from './uploadButton';
import ConfirmForm from '../confirmForm';

const LgtmsPanel: React.VFC = () => {
  const [openConfirmForm, setOpenConfirmForm] = useState<boolean>(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>();

  const handleCloseConfirmForm = () => {
    setOpenConfirmForm(false);
  };

  const handleChangeFile = (file: File) => {
    ImageFileReader.readAsDataUrl(file).then(dataUrl => {
      setPreviewDataUrl(dataUrl);
      setOpenConfirmForm(true);
    });
  };

  return (
    <Box>
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
