import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import Link from '@/components/utils/Link';

const LinkListItem = styled('li')(({ theme }) => ({
  marginBottom: theme.spacing(1),
  textAlign: 'center',
}));

const Footer: React.FC = React.memo(() => {
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
      </ul>
    </Box>
  );
});

Footer.displayName = 'Footer';

export default Footer;
