import React, { useMemo } from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useTranslate } from '~/hooks/translateHooks';
import Header from './Header';
import Footer from './Footer';
import { theme } from './theme';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const Layout: React.VFC<LayoutProps> = React.memo(props => {
  return (
    <ThemeProvider theme={theme}>
      <LayoutContent {...props} />
    </ThemeProvider>
  );
});

Layout.displayName = 'Layout';

const LayoutContent: React.VFC<LayoutProps> = React.memo(props => {
  const { children, title } = props;

  const { t } = useTranslate();

  const pageTitle = useMemo(() => {
    const baseTitle = t.APP_NAME;
    if (!title) {
      return baseTitle;
    }
    return `${title} | ${baseTitle}`;
  }, [t.APP_NAME, title]);

  return (
    <Box
      sx={{
        backgroundColor: theme => theme.palette.primary.light,
        minHeight: '100vh',
      }}
    >
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <CssBaseline />
      <Header />
      <Container component='main' maxWidth='lg' sx={{ pt: 2 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
});

LayoutContent.displayName = 'LayoutContent';

export default Layout;
