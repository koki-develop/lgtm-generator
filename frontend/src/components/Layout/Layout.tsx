import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import Meta from '~/components/utils/Meta';
import Footer from './Footer';
import Header from './Header';
import { theme } from './theme';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = React.memo(props => {
  return (
    <ThemeProvider theme={theme}>
      <LayoutContent {...props} />
    </ThemeProvider>
  );
});

Layout.displayName = 'Layout';

const LayoutContent: React.FC<LayoutProps> = React.memo(props => {
  const { children, title } = props;

  return (
    <Box
      sx={{
        backgroundColor: theme => theme.palette.primary.light,
        minHeight: '100vh',
      }}
    >
      <Meta title={title} />
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
