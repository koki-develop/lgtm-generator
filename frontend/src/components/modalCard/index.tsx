import React from 'react';
import Modal, { ModalProps } from '~/components/modal';
import {
  Box,
  Card,
  Container,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  Close as CloseIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    closeIconContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: theme.spacing(1),
    },
    closeIcon: {
      color: theme.palette.text.secondary,
      cursor: 'pointer',
    },
  }),
);

type ModalCardProps = ModalProps;

const ModalCard: React.VFC<ModalCardProps> = (props: ModalCardProps) => {
  const classes = useStyles();
  const { children, ...modalProps } = props;

  return (
    <Modal
      {...modalProps}
      className={classes.modal}
    >
      <Container maxWidth='md'>
        <Card>
          <Box className={classes.closeIconContainer}>
            <CloseIcon
              className={classes.closeIcon}
              onClick={() => props.onClose}
            />
          </Box>
          {children}
        </Card>
      </Container>
    </Modal>
  );
};

export default ModalCard;
