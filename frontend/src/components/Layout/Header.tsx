import React from 'react';
import Link from 'next/link';
import { Routes } from '~/routes';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header: React.VFC = () => {
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
};

export default Header;
