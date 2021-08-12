import React from 'react';
import Link from 'next/link';
import { Routes } from '~/routes';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      fontFamily: 'ArchivoBlack',
      fontSize: 30,
      [theme.breakpoints.down('sm')]: {
        fontSize: 24,
      },
    },
  }),
);

const Header: React.VFC = () => {
  const classes = useStyles();

  return (
    <AppBar
      color='primary'
      position='static'
    >
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
