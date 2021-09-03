import React from 'react';
import Header from './header';
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
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Layout {...props} />
      </ToastProvider>
    </ThemeProvider>
  );
};

const Layout: React.VFC<LayoutProps> = (props: LayoutProps) => {
  const classes = useStyles();

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
