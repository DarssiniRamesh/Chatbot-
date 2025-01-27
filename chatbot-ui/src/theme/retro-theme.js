import { createTheme } from '@mui/material/styles';

// PUBLIC_INTERFACE
const retroTheme = createTheme({
  palette: {
    primary: {
      main: '#B85C38', // Warm vintage brown
      light: '#E2A76F',
      dark: '#8B4513',
      contrastText: '#FFFDD0', // Cream color for contrast
    },
    secondary: {
      main: '#5C8374', // Muted sage green
      light: '#7FA089',
      dark: '#3F5E51',
      contrastText: '#FFFDD0',
    },
    background: {
      default: '#F5F1E3', // Vintage paper color
      paper: '#FFFDD0', // Cream color
    },
    error: {
      main: '#A45D5D', // Muted red
      light: '#C17F7F',
      dark: '#854747',
      contrastText: '#FFFDD0',
    },
    success: {
      main: '#618264', // Muted green
      light: '#799C7B',
      dark: '#4A634C',
      contrastText: '#FFFDD0',
    },
    text: {
      primary: '#2C3639', // Dark vintage gray
      secondary: '#4E5559', // Muted text color
    },
  },
  typography: {
    fontFamily: '"Courier Prime", "Courier New", monospace',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#2C3639',
      marginBottom: '1rem',
      letterSpacing: '0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#2C3639',
      marginBottom: '0.875rem',
      letterSpacing: '0.02em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#2C3639',
      marginBottom: '0.75rem',
      letterSpacing: '0.02em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#2C3639',
      fontFamily: '"Courier Prime", "Courier New", monospace',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#4E5559',
      fontFamily: '"Courier Prime", "Courier New", monospace',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4, // More squared corners for retro look
  },
  components: {
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#B85C38',
          '&.MuiCircularProgress-colorSecondary': {
            color: '#5C8374',
          },
        },
        circle: {
          strokeLinecap: 'square', // More angular for retro look
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'uppercase', // Retro style buttons often used uppercase
          fontWeight: 700,
          padding: '8px 24px',
          fontFamily: '"Courier Prime", "Courier New", monospace',
          letterSpacing: '0.1em',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(184, 92, 56, 0.15)',
          },
        },
        contained: {
          boxShadow: '0 2px 8px rgba(184, 92, 56, 0.1)',
          border: '2px solid #B85C38', // Border for retro button look
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: '0 2px 12px rgba(44, 54, 57, 0.08)',
          transition: 'box-shadow 0.2s ease-in-out',
          border: '1px solid rgba(184, 92, 56, 0.1)', // Subtle border for retro look
          '&:hover': {
            boxShadow: '0 4px 20px rgba(44, 54, 57, 0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            fontFamily: '"Courier Prime", "Courier New", monospace',
            transition: 'all 0.2s ease-in-out',
            border: '2px solid rgba(184, 92, 56, 0.5)', // Thicker border for retro look
            '&:hover': {
              borderColor: '#B85C38',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 2px rgba(184, 92, 56, 0.2)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#4E5559',
            fontFamily: '"Courier Prime", "Courier New", monospace',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(44, 54, 57, 0.08)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          border: '2px solid rgba(184, 92, 56, 0.1)', // Thicker border for retro look
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 24px rgba(44, 54, 57, 0.12)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 700,
          fontFamily: '"Courier Prime", "Courier New", monospace',
          border: '1px solid currentColor',
          '&.MuiChip-colorPrimary': {
            backgroundColor: 'rgba(184, 92, 56, 0.12)',
            color: '#B85C38',
          },
          '&.MuiChip-colorSecondary': {
            backgroundColor: 'rgba(92, 131, 116, 0.12)',
            color: '#5C8374',
          },
        },
      },
    },
  },
});

export default retroTheme;