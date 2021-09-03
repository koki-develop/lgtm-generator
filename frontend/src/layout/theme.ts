import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1E90FF',
      dark: '#0070DF',
      light: '#E8EEF2',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontWeight: 'bold',
      },
    },
    MuiCssBaseline: {
      '@global': {
        a: {
          color: 'inherit',
          textDecoration: 'none',
          transition: '0.15s',
          '&:hover': {
            opacity: 0.6,
          },
        },
        ul: {
          listStyle: 'none',
          padding: 0,
        },
      },
    },
  },
});
