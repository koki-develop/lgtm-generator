import { createTheme, PaletteOptions } from '@mui/material/styles';

const palette: PaletteOptions = {
  primary: {
    main: '#1E90FF',
    dark: '#0070DF',
    light: '#E8EEF2',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#E0E0E0',
    dark: '#D5D5D5',
    light: '#F7F7F7',
    contrastText: '#000000',
  },
};

export const theme = createTheme({
  palette,
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          fontWeight: 'bold',
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        grouped: {
          ':not(:last-of-type)': {
            borderRight: 'none',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'inherit',
          textDecoration: 'none',
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
        ul: {
          listStyleType: 'none',
          paddingLeft: 0,
        },
      },
    },
  },
});
