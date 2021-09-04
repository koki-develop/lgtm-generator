import React, { useEffect } from 'react';
import {
  useSetRecoilState,
  RecoilRoot,
} from 'recoil';
import { favoriteIdsState } from '~/recoil/atoms';
import Header from './header';
import { DataStorage } from '~/lib/dataStorage';
import Footer from './footer';
import ToastProvider from '~/contexts/toastProvider';
import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import { theme } from './theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.light,
      minHeight: '100vh',
    },
    main: {
      paddingTop: theme.spacing(2),
    },
  }),
);

type LayoutProps = {
  children: React.ReactNode;
};

const Root: React.VFC<LayoutProps> = (props: LayoutProps) => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <Layout {...props} />
        </ToastProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
};

const Layout: React.VFC<LayoutProps> = (props: LayoutProps) => {
  const classes = useStyles();

  const setFavoriteIds = useSetRecoilState(favoriteIdsState);

  useEffect(() => {
    setFavoriteIds(DataStorage.getFavoriteIds());
  }, []);

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <Header />
      <Container
        className={classes.main}
        component='main'
        maxWidth='lg'
      >
        {props.children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Root;
