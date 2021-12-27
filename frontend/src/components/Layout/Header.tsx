import React, { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TranslateIcon from '@mui/icons-material/Translate';
import { Routes } from '~/routes';
import { useTranslate } from '~/hooks/translateHooks';

const Header: React.VFC = React.memo(() => {
  const router = useRouter();

  const { t } = useTranslate();

  const [translateButtonEl, setTranslateButtonEl] =
    useState<HTMLButtonElement | null>(null);

  const handleClickTranslate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setTranslateButtonEl(e.currentTarget);
    },
    [],
  );

  const handleClickOutsideTranslateMenu = useCallback(() => {
    setTranslateButtonEl(null);
  }, []);

  return (
    <AppBar color='primary' position='static'>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link href={Routes.home}>
            <a style={{ display: 'inline-block' }}>
              <Typography
                sx={theme => ({
                  fontFamily: 'ArchivoBlack',
                  fontSize: theme => theme.typography.h4.fontSize,
                  [theme.breakpoints.down('sm')]: {
                    fontSize: theme => theme.typography.h5.fontSize,
                  },
                })}
              >
                {t.APP_NAME}
              </Typography>
            </a>
          </Link>
        </Box>
        <IconButton
          onClick={handleClickTranslate}
          sx={{ color: theme => theme.palette.primary.contrastText }}
        >
          <TranslateIcon />
        </IconButton>
        <Popper
          open={Boolean(translateButtonEl)}
          anchorEl={translateButtonEl}
          placement='bottom-end'
        >
          <ClickAwayListener onClickAway={handleClickOutsideTranslateMenu}>
            <Paper>
              <List disablePadding>
                <ListItem disablePadding>
                  <Link href={router.asPath} locale='ja' passHref>
                    <ListItemButton>
                      <ListItemText primary='日本語' />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href={router.asPath} locale='en' passHref>
                    <ListItemButton>
                      <ListItemText primary='English' />
                    </ListItemButton>
                  </Link>
                </ListItem>
              </List>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </Toolbar>
    </AppBar>
  );
});

Header.displayName = 'Header';

export default Header;
