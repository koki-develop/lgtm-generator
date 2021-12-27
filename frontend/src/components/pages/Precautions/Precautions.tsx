import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { useTranslate } from '~/hooks/translateHooks';
import Layout from '~/components/Layout';

const StyledList = styled('ul')(({ theme }) => ({
  listStyle: 'disc',
  paddingLeft: theme.spacing(4),
}));

const StyledListItem = styled('li')(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const Precautions: React.VFC = React.memo(() => {
  const { t } = useTranslate();

  return (
    <Layout title={t.PRECAUTIONS}>
      <Typography
        sx={{
          fontSize: theme => theme.typography.h4.fontSize,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {t.PRECAUTIONS}
      </Typography>
      <Box>
        <StyledList>
          {t.PRECAUTIONS_ITEMS.map((item, i) => (
            <StyledListItem key={i} sx={{ mb: 1 }}>
              {item}
            </StyledListItem>
          ))}
        </StyledList>
      </Box>
    </Layout>
  );
});

Precautions.displayName = 'Precautions';

export default Precautions;
