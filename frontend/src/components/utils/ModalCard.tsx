import React from 'react';
import Modal from '~/components/utils/Modal';
import { Box, Card, Container } from '@mui/material';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Close as CloseIcon } from '@mui/icons-material';

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
