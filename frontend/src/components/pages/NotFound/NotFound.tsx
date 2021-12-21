import React from 'react';
import Layout from '~/components/Layout';
import { Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

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
