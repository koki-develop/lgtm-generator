import React from 'react';
import Layout from '~/components/Layout';
import { Typography } from '@mui/material';
import { useTranslate } from '~/hooks/translateHooks';

const NotFound: React.VFC = React.memo(() => {
  const { t } = useTranslate();

  return (
    <Layout title={t.NOT_FOUND}>
      <Typography
        sx={{
          fontSize: theme => theme.typography.h5.fontSize,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {t.NOT_FOUND}
      </Typography>
    </Layout>
  );
});

NotFound.displayName = 'NotFound';

export default NotFound;
