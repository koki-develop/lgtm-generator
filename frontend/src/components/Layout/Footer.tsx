import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import Link from '@/components/utils/Link';
import { useTranslate } from '@/hooks/translateHooks';
import { Routes } from '@/routes';

const LinkListItem = styled('li')(({ theme }) => ({
  marginBottom: theme.spacing(1),
  textAlign: 'center',
}));

const Footer: React.FC = React.memo(() => {
  const { t } = useTranslate();

  return (
    <Box
      component='footer'
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ul>
        <LinkListItem sx={{ mb: 2 }}>
          <Link external href='https://koki.me'>
            <Typography component='small'>&copy;2021 koki sato</Typography>
          </Link>
        </LinkListItem>
        <LinkListItem>
          <Link external href='https://github.com/koki-develop/lgtm-generator'>
            View on GitHub
          </Link>
        </LinkListItem>
        <LinkListItem>
          <Link href={Routes.precautions}>{t.PRECAUTIONS}</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href={Routes.privacyPolicy}>{t.PRIVACY_POLICY}</Link>
        </LinkListItem>
      </ul>
    </Box>
  );
});

Footer.displayName = 'Footer';

export default Footer;
