import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslate } from '@/hooks/translateHooks';
import Layout from '@/components/Layout';

const PrivacyPolicy: React.FC = React.memo(() => {
  const { t } = useTranslate();

  const items: { name: string; content: React.ReactNode }[] = useMemo(() => {
    return [
      {
        name: t.USE_OF_ACCESS_ANALYSIS_TOOLS,
        content: t.USE_OF_ACCESS_ANALYSIS_TOOLS_CONTENT,
      },
      {
        name: t.UPDATING_PRIVACY_POLICY,
        content: t.UPDATING_PRIVACY_POLICY_CONTENT,
      },
    ];
  }, [
    t.UPDATING_PRIVACY_POLICY,
    t.UPDATING_PRIVACY_POLICY_CONTENT,
    t.USE_OF_ACCESS_ANALYSIS_TOOLS,
    t.USE_OF_ACCESS_ANALYSIS_TOOLS_CONTENT,
  ]);

  return (
    <Layout title={t.PRIVACY_POLICY}>
      <Typography
        sx={{
          fontSize: theme => theme.typography.h4.fontSize,
          fontWeight: 'bold',
          mb: 2,
          textAlign: 'center',
        }}
      >
        {t.PRIVACY_POLICY}
      </Typography>
      <Box>
        {items.map(item => (
          <Box
            key={item.name}
            sx={{
              mb: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: theme => theme.typography.h5.fontSize,
                textAlign: 'center',
              }}
            >
              {item.name}
            </Typography>
            <Typography>{item.content}</Typography>
          </Box>
        ))}
      </Box>
    </Layout>
  );
});

PrivacyPolicy.displayName = 'PrivacyPolicy';

export default PrivacyPolicy;
