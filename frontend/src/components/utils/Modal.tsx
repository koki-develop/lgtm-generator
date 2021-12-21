import React from 'react';
import {
  Backdrop,
  Fade,
  Modal as MuiModal,
  ModalProps as MuiModalProps,
} from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      overflowY: 'scroll',
    },
  }),
);

type ModalProps = MuiModalProps;

const Modal: React.VFC<ModalProps> = (props: ModalProps) => {
  const classes = useStyles();
  const { children, ...modalProps } = props;

  return (
    <MuiModal
      {...modalProps}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 200 }}
    >
      <Fade in={props.open}>{children}</Fade>
    </MuiModal>
  );
};

export default Modal;
