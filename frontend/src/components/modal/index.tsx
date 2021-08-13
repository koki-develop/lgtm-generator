import React from 'react';
import {
  Backdrop,
  Fade,
  Modal as MuiModal,
  ModalProps as MuiModalProps,
} from '@material-ui/core';

export type ModalProps = MuiModalProps;

const Modal: React.VFC<ModalProps> = (props: ModalProps) => {
  const { children, ...modalProps } = props;

  return (
    <MuiModal
      {...modalProps}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 200 }}
    >
      <Fade in={props.open}>
        {children}
      </Fade>
    </MuiModal>
  );
};

export default Modal;
