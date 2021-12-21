import React from 'react';
import Link from 'next/link';
import { Routes } from '~/routes';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      fontFamily: 'ArchivoBlack',
      fontSize: theme.typography.h4.fontSize,
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
  }),
);

const Header: React.VFC = () => {
  const classes = useStyles();

  return (
    <AppBar color='primary' position='static'>
      <Toolbar>
        <Link href={Routes.home}>
          <a>
            <Typography className={classes.logo}>LGTM Generator</Typography>
          </a>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
