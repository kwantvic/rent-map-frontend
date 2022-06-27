import { createTheme } from '@mui/material';

const colors = {
  primaryMain: '#2C3539',
  secondaryMain: '#F59440',
  white: '#FFF',
  grey: '#f1f4f5',
};

const defaultTheme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: colors.primaryMain,
    },
    secondary: {
      main: colors.secondaryMain,
      contrastText: colors.white,
    },
  },
  typography: {
    h2: {
      fontSize: 40,
      fontWeight: 200,
      letterSpacing: '-1.5px',
    },
    h3: {
      fontSize: 18,
      fontWeight: 600,
    },
    h5: {
      fontSize: 14,
      fontWeight: 400,
    },
    h6: {
      fontSize: 12,
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          input: {
            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
              '-webkit-appearance': 'none',
              display: 'none',
            },
          },
        },
      },
    },
  },
});

export default defaultTheme;
