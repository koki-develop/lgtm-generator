import React from 'react';
import Layout from '~/components/Layout';
import { Typography } from '@mui/material';

const NotFound: React.VFC = React.memo(() => {
  const message = 'お探しのページは見つかりませんでした';

  return (
    <Layout title={message}>
      <Typography
        sx={{
          fontSize: theme => theme.typography.h5.fontSize,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {message}
      </Typography>
    </Layout>
  );
});

NotFound.displayName = 'NotFound';

export default NotFound;
