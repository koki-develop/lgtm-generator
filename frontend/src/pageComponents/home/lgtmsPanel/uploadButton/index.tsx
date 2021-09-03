import React, { useState } from 'react';
import {
  Fab,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  AddCircle as AddCircleIcon,
} from '@material-ui/icons';
import * as uuid from 'uuid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      bottom: theme.spacing(2),
      fontWeight: 'bold',
      position: 'fixed',
      right: theme.spacing(2),
    },
    input: {
      display: 'none',
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  }),
);

type UploadButtonProps = {
  onChange: (file: File) => void;
};

const UploadButton: React.VFC<UploadButtonProps> = React.memo((props: UploadButtonProps) => {
  const classes = useStyles();

  const inputFileRef = React.createRef<HTMLInputElement>();
  const [inputFileKey, setInputFileKey] = useState<string>(uuid.v4());

  const handleClick = () => {
    inputFileRef.current?.click();
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFileKey(uuid.v4());
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      props.onChange(files[0]);
    }
  };

  return (
    <Fab
      className={classes.fab}
      color='primary'
      variant='extended'
      onClick={handleClick}
    >
      <input
        className={classes.input}
        key={inputFileKey}
        ref={inputFileRef}
        type="file"
        accept={'image/*'}
        onChange={handleChangeFile}
      />
      <AddCircleIcon className={classes.icon} />
      アップロード
    </Fab>
  );
});

UploadButton.displayName = 'UploadButton';

export default UploadButton;
