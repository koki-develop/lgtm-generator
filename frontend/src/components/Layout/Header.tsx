import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
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
      </Toolbar>
    </AppBar>
  );
});

Header.displayName = 'Header';

export default Header;
