import React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Routes } from '~/routes';

const Header: React.VFC = React.memo(() => {
  return (
    <AppBar color='primary' position='static'>
      <Toolbar>
        <Link href={Routes.home}>
          <a>
            <Typography
              sx={theme => ({
                fontFamily: 'ArchivoBlack',
                fontSize: theme => theme.typography.h4.fontSize,
                [theme.breakpoints.down('sm')]: {
                  fontSize: theme => theme.typography.h5.fontSize,
                },
              })}
            >
              LGTM Generator
            </Typography>
          </a>
        </Link>
      </Toolbar>
    </AppBar>
  );
});

Header.displayName = 'Header';

export default Header;
