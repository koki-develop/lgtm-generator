import { createTheme, PaletteColorOptions } from '@mui/material/styles';

const primary: PaletteColorOptions = {
  main: '#1E90FF',
  dark: '#0070DF',
  light: '#E8EEF2',
};

export const theme = createTheme({
  palette: {
    primary,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          color: 'inherit',
          textDecoration: 'none',
          transition: '0.15s',
          '&:hover': {
            opacity: 0.6,
          },
        },
      },
    },
  },
});
