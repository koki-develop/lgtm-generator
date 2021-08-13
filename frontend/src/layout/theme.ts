import { createTheme } from '@material-ui/core';

export const theme = createTheme({
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
