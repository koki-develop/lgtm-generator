import { AddCircle as AddCircleIcon } from '@mui/icons-material';
import { Fab } from '@mui/material';
import React, { useCallback, useState } from 'react';
import * as uuid from 'uuid';
import { useTranslate } from '@/hooks/translateHooks';

type UploadButtonProps = {
  onChange: (file: File) => void;
};

const UploadButton: React.FC<UploadButtonProps> = React.memo(props => {
  const { onChange } = props;

  const inputFileRef = React.createRef<HTMLInputElement>();
  const [inputFileKey, setInputFileKey] = useState<string>(uuid.v4());

  const { t } = useTranslate();

  const handleClick = useCallback(() => {
    inputFileRef.current?.click();
  }, [inputFileRef]);

  const handleChangeFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputFileKey(uuid.v4());
      const files = e.currentTarget.files;
      if (files && files.length > 0) {
        onChange(files[0]);
      }
    },
    [onChange],
  );

  return (
    <Fab
      color='primary'
      variant='extended'
      onClick={handleClick}
      sx={{
        bottom: theme => theme.spacing(2),
        fontWeight: 'bold',
        position: 'fixed',
        right: theme => theme.spacing(2),
        zIndex: 999,
      }}
    >
      <input
        data-testid='upload-file-input'
        key={inputFileKey}
        ref={inputFileRef}
        type='file'
        accept={'image/*'}
        onChange={handleChangeFile}
        style={{ display: 'none' }}
      />
      <AddCircleIcon sx={{ mr: 1 }} />
      {t.UPLOAD}
    </Fab>
  );
});

UploadButton.displayName = 'UploadButton';

export default UploadButton;
