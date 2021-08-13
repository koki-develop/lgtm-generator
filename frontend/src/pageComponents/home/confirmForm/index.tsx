import React from 'react';
import { Routes } from '~/routes';
import ModalCard from '~/components/modalCard';
import ExternalLink from '~/components/externalLink';
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
  onClose: () => void;
};

const ConfirmForm: React.VFC<ConfirmFormProps> = (props: ConfirmFormProps) => {
  const classes = useStyles();

  return (
    <ModalCard
      open={props.open}
      onClose={props.onClose}
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
          onClick={props.onClose}
        >
          キャンセル
        </Button>
        <Button
          fullWidth
          color='primary'
          variant='contained'
        >
          生成
        </Button>
      </CardActions>
    </ModalCard>
  );
};

export default ConfirmForm;
