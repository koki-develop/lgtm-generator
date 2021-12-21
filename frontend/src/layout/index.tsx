import React, { useMemo } from 'react';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import Header from './header';
import Footer from './footer';
import ToastProvider from '~/contexts/toastProvider';
import { Box, Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
  title?: string;
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
  const { title } = props;

  const pageTitle = useMemo(() => {
    const baseTitle = 'LGTM Generator';
    if (!title) {
      return baseTitle;
    }
    return `${title} | ${baseTitle}`;
  }, [title]);

  return (
    <Box className={classes.root}>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <CssBaseline />
      <Header />
      <Container className={classes.main} component='main' maxWidth='lg'>
        {props.children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Root;
