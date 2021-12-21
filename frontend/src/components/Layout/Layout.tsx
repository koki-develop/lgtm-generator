import React, { useMemo } from 'react';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import Header from './Header';
import Footer from './Footer';
import ToastProvider from '~/components/providers/ToastProvider';
import { Box, Container, CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { theme } from './theme';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


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
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <Layout {...props} />
          </ToastProvider>
        </ThemeProvider>
      </StyledEngineProvider>
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
