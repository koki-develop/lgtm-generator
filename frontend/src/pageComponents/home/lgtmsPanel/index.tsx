import React from 'react';
import {
  Box,
} from '@material-ui/core';
import UploadButton from './uploadButton';

const LgtmsPanel: React.VFC = () => {
  const handleChangeFile = (file: File) => {
    console.log(file);
  };

  return (
    <Box>
      <UploadButton onChange={handleChangeFile}/>
    </Box>
  );
};

export default LgtmsPanel;
