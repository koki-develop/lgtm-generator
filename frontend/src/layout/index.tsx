import React from 'react';
import Header from './header';
import Footer from './footer';
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
    main: {
      padding: theme.spacing(2),
    },
  }),
);

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
  const classes = useStyles();

  return (
    <Box>
      <CssBaseline />
      <Header />
      <Container
        className={classes.main}
        component='main'
        maxWidth='md'
      >
        {props.children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Root;
