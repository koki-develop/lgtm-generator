import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    circle: {
      marginBottom: theme.spacing(1),
    },
    text: {
      color: '#fff',
      fontWeight: 'bold',
    },
  }),
);

type LoadingProps = {
  text?: string;
};

const Loading: React.VFC<LoadingProps> = (props: LoadingProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress className={classes.circle} />
      {props.text && (
        <Typography className={classes.text}>{props.text}</Typography>
      )}
    </Box>
  );
};

export default Loading;
