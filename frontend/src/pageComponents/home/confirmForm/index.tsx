import React from 'react';
import { Routes } from '~/routes';
import ModalCard from '~/components/modalCard';
import ExternalLink from '~/components/externalLink';
import LoadableButton from '~/components/loadableButton';
import {
  Button,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 0,
    },
    img: {
      border: '1px solid #dddddd',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      maxHeight: 300,
      maxWidth: '100%',
    },
    precautionLink: {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
  }),
);

type ConfirmFormProps = {
  previewDataUrl: string;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmForm: React.VFC<ConfirmFormProps> = (props: ConfirmFormProps) => {
  const classes = useStyles();

  const handleClose = () => {
    if (props.loading) return;
    props.onClose();
  };

  return (
    <ModalCard
      open={props.open}
      onClose={handleClose}
    >
      <CardContent className={classes.content}>
        <Typography>この画像で LGTM 画像を生成しますか？</Typography>
        <img
          className={classes.img}
          src={props.previewDataUrl}
          alt='preview'
        />
        <Typography>
          LGTM 画像を生成する前に
          <ExternalLink
            className={classes.precautionLink}
            href={Routes.precaution}
          >
            ご利用上の注意
          </ExternalLink>
          をお読みください
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant='contained'
          onClick={handleClose}
          disabled={props.loading}
        >
          キャンセル
        </Button>
        <LoadableButton
          fullWidth
          color='primary'
          variant='contained'
          loading={props.loading}
          onClick={props.onConfirm}
        >
          生成
        </LoadableButton>
      </CardActions>
    </ModalCard>
  );
};

export default ConfirmForm;
