import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff', // Neon Cyan
    },
    background: {
      default: '#0a0a0a', 
      paper: '#151515', 
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0aab2', 
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.05em', 
    },
  },
  shape: {
    borderRadius: 8, 
  },
});

export default theme;