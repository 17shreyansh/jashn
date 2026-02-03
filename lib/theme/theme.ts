'use client'

import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary']
    neutral: {
      50: string
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
      800: string
      900: string
    }
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary']
    neutral?: {
      50: string
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
      800: string
      900: string
    }
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1A1A1A', // Jet Black/Charcoal for a premium anchor
      light: '#2C2C2C',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C9A959', // Muted Gold/Bronze for luxury accents
      light: '#E3C780',
      dark: '#9E833A',
      contrastText: '#1A1A1A',
    },
    accent: {
      main: '#64748B', // Sophisticated Slate
      light: '#94A3B8',
      dark: '#475569',
      contrastText: '#FFFFFF',
    },
    neutral: {
      50: '#FAFAF9', // Stone-50 (Warmer than standard gray)
      100: '#F5F5F4',
      200: '#E7E5E4',
      300: '#D6D3D1',
      400: '#A8A29E',
      500: '#78716C',
      600: '#57534E',
      700: '#44403C',
      800: '#292524',
      900: '#1C1917',
    },
    background: {
      default: '#FAFAF9', // Warm off-white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1C1917',
      secondary: '#57534E',
    },
    divider: '#E7E5E4',
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif', // Suggesting a more modern geometric sans
    h1: {
      fontWeight: 800,
      fontSize: '4.5rem',
      lineHeight: 1.05,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1.0625rem',
      lineHeight: 1.75,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.9375rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 16, // Softer curves
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(28, 25, 23, 0.04)', // Very subtle ambient
    '0px 4px 8px rgba(28, 25, 23, 0.06)',
    '0px 8px 16px rgba(28, 25, 23, 0.08)',
    '0px 12px 24px rgba(28, 25, 23, 0.10)',
    '0px 24px 48px rgba(28, 25, 23, 0.12)', // High elevation
    // ...filling remaining slots to prevent errors, repeating soft shadows
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.05)',
    '0px 8px 16px rgba(0,0,0,0.05)',
    '0px 12px 24px rgba(0,0,0,0.05)',
    '0px 24px 48px rgba(0,0,0,0.05)',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.05)',
    '0px 8px 16px rgba(0,0,0,0.05)',
    '0px 12px 24px rgba(0,0,0,0.05)',
    '0px 24px 48px rgba(0,0,0,0.05)',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.05)',
    '0px 8px 16px rgba(0,0,0,0.05)',
    '0px 12px 24px rgba(0,0,0,0.05)',
    '0px 24px 48px rgba(0,0,0,0.05)',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.05)',
    '0px 8px 16px rgba(0,0,0,0.05)',
    '0px 12px 24px rgba(0,0,0,0.05)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50, // Pill shape is more modern luxury
          padding: '12px 28px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: 'rgba(28, 25, 23, 0.03)',
          },
        },
        sizeLarge: {
          padding: '16px 32px',
          fontSize: '1.0625rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          border: '1px solid rgba(231, 229, 228, 0.8)', // Subtle border
          background: '#FFFFFF',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)',
        },
      },
    },
  },
})