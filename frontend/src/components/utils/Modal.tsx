import {
  Backdrop,
  Fade,
  Modal as MuiModal,
  ModalProps as MuiModalProps,
} from '@mui/material';
import React from 'react';

export type ModalProps = Omit<MuiModalProps, 'onClose'> & {
  onClose?: () => void;
};

const Modal: React.FC<ModalProps> = React.memo(props => {
  const { children, ...modalProps } = props;

  return (
    <MuiModal
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'scroll',
        ...modalProps.sx,
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 200, ...modalProps.BackdropProps }}
      {...modalProps}
    >
      <Fade in={props.open}>{children}</Fade>
    </MuiModal>
  );
});

Modal.displayName = 'Modal';

export default Modal;
