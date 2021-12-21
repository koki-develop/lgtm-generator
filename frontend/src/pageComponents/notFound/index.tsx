import React from 'react';
import Layout from '~/layout';
import { Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    message: {
      fontSize: theme.typography.h5.fontSize,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  }),
);

const NotFound: React.VFC = () => {
  const classes = useStyles();

  const message = 'お探しのページは見つかりませんでした';

  return (
    <Layout title={message}>
      <Typography className={classes.message}>{message}</Typography>
    </Layout>
  );
};

export default NotFound;
