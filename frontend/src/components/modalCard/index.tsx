import React from 'react';
import Modal from '~/components/modal';
import { Box, Card, Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Close as CloseIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

type ModalCardProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalCard: React.VFC<ModalCardProps> = (props: ModalCardProps) => {
  const classes = useStyles();

  return (
    <Modal open={props.open}>
      <Container maxWidth='sm'>
        <Card>
          <Box className={classes.closeIconContainer}>
            <CloseIcon
              className={classes.closeIcon}
              onClick={() => props.onClose()}
            />
          </Box>
          {props.children}
        </Card>
      </Container>
    </Modal>
  );
};

export default ModalCard;
