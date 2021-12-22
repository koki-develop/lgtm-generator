import React, { useCallback } from 'react';
import Modal, { ModalProps } from '~/components/utils/Modal';
import { Box, Card, Container } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

type ModalCardProps = ModalProps;

const ModalCard: React.VFC<ModalCardProps> = React.memo(props => {
  const { onClose, ...modalProps } = props;

  const handleClickCloseIcon = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal {...modalProps}>
      <Container
        maxWidth='sm'
        sx={{
          zIndex: theme => theme.zIndex.modal + 1,
        }}
      >
        <Card>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 1,
            }}
          >
            <CloseIcon
              sx={{
                color: theme => theme.palette.text.secondary,
                cursor: 'pointer',
              }}
              onClick={handleClickCloseIcon}
            />
          </Box>
          {props.children}
        </Card>
      </Container>
    </Modal>
  );
});

ModalCard.displayName = 'ModalCard';

export default ModalCard;
