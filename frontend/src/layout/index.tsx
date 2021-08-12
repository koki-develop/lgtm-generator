import React from 'react';
import Header from './header';
import {
  Box,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core';
import { theme } from './theme';

type LayoutProps = {
  children: React.ReactNode;
};

const Root: React.VFC<LayoutProps> = (props: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout {...props} />
    </ThemeProvider>
  );
};

const Layout: React.VFC<LayoutProps> = (props: LayoutProps) => {
  return (
    <Box>
      <CssBaseline />
      <Header />
      {props.children}
    </Box>
  );
};

export default Root;
