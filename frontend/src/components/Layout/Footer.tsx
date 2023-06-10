import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import Link from '@/components/utils/Link';
import { createTranslate } from '@/hooks/i18n';
import { Routes } from '@/routes';

const useTranslate = createTranslate({
  precautions: {
    ja: '利用上の注意',
    en: 'Precautions',
  },
  privacy_policy: {
    ja: 'プライバシーポリシー',
    en: 'Privacy Policy',
  },
});

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
          <Link href={Routes.precautions}>{t('precautions')}</Link>
        </LinkListItem>
        <LinkListItem>
          <Link href={Routes.privacyPolicy}>{t('privacy_policy')}</Link>
        </LinkListItem>
      </ul>
    </Box>
  );
});

Footer.displayName = 'Footer';

export default Footer;
