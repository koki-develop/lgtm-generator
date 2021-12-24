import React from 'react';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { Routes } from '~/routes';
import ExternalLink from '~/components/utils/ExternalLink';

const LinkListItem = styled('li')(({ theme }) => ({
  marginBottom: theme.spacing(1),
  textAlign: 'center',
}));

const Footer: React.VFC = React.memo(() => {
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
          <ExternalLink href='https://koki.me'>
            <Typography component='small'>&copy;2021 koki sato</Typography>
          </ExternalLink>
        </LinkListItem>
        <LinkListItem>
          <ExternalLink href='https://github.com/koki-develop/lgtm-generator'>
            View on GitHub
          </ExternalLink>
        </LinkListItem>
        <LinkListItem>
          <Link href={Routes.precaution}>
            <a>ご利用上の注意</a>
          </Link>
        </LinkListItem>
        <LinkListItem>
          <Link href={Routes.privacyPolicy}>
            <a>プライバシーポリシー</a>
          </Link>
        </LinkListItem>
      </ul>
    </Box>
  );
});

Footer.displayName = 'Footer';

export default Footer;
