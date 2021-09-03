import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core';
import {
  FavoriteBorder as FavoriteBorderIcon,
  FileCopyOutlined as FileCopyOutlinedIcon,
  FlagOutlined as FlagOutlinedIcon,
} from '@material-ui/icons';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  grey,
  orange,
  pink,
} from '@material-ui/core/colors';
import urlJoin from 'url-join';
import { Lgtm } from '~/types/lgtm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      border: '1px solid',
      borderColor: grey['A100'],
      height: 150,
      maxWidth: '100%',
    },
    imgContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    cardContent: {
      padding: theme.spacing(1),
    },
    cardActions: {
      justifyContent: 'center',
      paddingTop: 0,
    },
    buttonGroup: {
      maxWidth: '100%',
    },
    copyButton: {
    },
    favoriteButton: {
      backgroundColor: '#fff',
      color: pink['700'],
      '&:hover': {
        backgroundColor: pink['50'],
      },
    },
    reportButton: {
      backgroundColor: orange['500'],
      color: '#fff',
      '&:hover': {
        backgroundColor: orange['700'],
      },
    },
  }),
);

type LgtmCardProps = {
  lgtm: Lgtm;
};

const LgtmCard: React.VFC<LgtmCardProps> = (props: LgtmCardProps) => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent className={classes.cardContent}>
        <Box className={classes.imgContainer}>
          <img
            className={classes.img}
            src={urlJoin(process.env.NEXT_PUBLIC_LGTMS_ORIGIN, props.lgtm.id)}
            alt="LGTM"
          />
        </Box>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <ButtonGroup className={classes.buttonGroup}>
          <Button
            className={classes.copyButton}
            color='primary'
            variant='contained'
          >
            <FileCopyOutlinedIcon fontSize='small' />
          </Button>
          <Button
            className={classes.favoriteButton}
            variant='contained'
          >
            <FavoriteBorderIcon fontSize='small' />
          </Button>
          <Button
            className={classes.reportButton}
            variant='contained'
          >
            <FlagOutlinedIcon fontSize='small' />
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default LgtmCard;
