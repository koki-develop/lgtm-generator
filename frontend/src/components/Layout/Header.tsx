import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TranslateIcon from '@mui/icons-material/Translate';
import { useMediaQuery, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import Link from '@/components/utils/Link';
import { Routes } from '@/routes';

type TranslateListItemProps = {
  text: string;
  locale: string;
  onClick: () => void;
};

const TranslateListItem: React.FC<TranslateListItemProps> = React.memo(
  props => {
    const { text, locale, onClick } = props;
    const router = useRouter();
    const currentLocale = router.locale;

    const selected = useMemo(() => {
      return currentLocale === locale;
    }, [currentLocale, locale]);

    return (
      <ListItem data-testid={`translate-list-item-${locale}`} disablePadding>
        <Link href={router.asPath} locale={locale} sx={{ width: '100%' }}>
          <ListItemButton onClick={onClick} selected={currentLocale === locale}>
            <ListItemText
              primary={text}
              primaryTypographyProps={{
                sx: {
                  textAlign: 'center',
                  color: selected
                    ? theme => theme.palette.primary.main
                    : undefined,
                  fontWeight: selected ? 'bold' : undefined,
                },
              }}
            />
          </ListItemButton>
        </Link>
      </ListItem>
    );
  },
);

TranslateListItem.displayName = 'TranslateListItem';

const Header: React.FC = React.memo(() => {
  const theme = useTheme();

  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const [translateButtonEl, setTranslateButtonEl] =
    useState<HTMLButtonElement | null>(null);

  const handleClickTranslate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setTranslateButtonEl(e.currentTarget);
    },
    [],
  );

  const handleClickTranslateMenuItem = useCallback(() => {
    setTranslateButtonEl(null);
  }, []);

  const handleClickOutsideTranslateMenu = useCallback(() => {
    setTranslateButtonEl(null);
  }, []);

  return (
    <AppBar color='primary' position='static'>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link href={Routes.home} sx={{ display: 'inline-block' }}>
            <Typography
              component='h1'
              sx={theme => ({
                fontFamily: 'Archivo Black',
                fontSize: theme => theme.typography.h4.fontSize,
                [theme.breakpoints.down('sm')]: {
                  fontSize: theme => theme.typography.h5.fontSize,
                },
              })}
            >
              LGTM Generator
            </Typography>
          </Link>
        </Box>
        <Button
          data-testid='translate-open-button'
          onClick={handleClickTranslate}
          variant='text'
          sx={{
            color: theme => theme.palette.primary.contrastText,
            pl: 0,
          }}
        >
          <ArrowDropDownIcon fontSize={isSmDown ? 'small' : 'medium'} />
          <TranslateIcon fontSize={isSmDown ? 'small' : 'medium'} />
        </Button>
        <Popper
          open={Boolean(translateButtonEl)}
          anchorEl={translateButtonEl}
          placement='bottom-end'
        >
          <ClickAwayListener onClickAway={handleClickOutsideTranslateMenu}>
            <Paper>
              <List>
                <TranslateListItem
                  locale='ja'
                  text='日本語'
                  onClick={handleClickTranslateMenuItem}
                />
                <TranslateListItem
                  locale='en'
                  text='English'
                  onClick={handleClickTranslateMenuItem}
                />
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
