export const themeConfig = {
  colors: {
    primary: '#6B46C1',      // Royal Purple
    secondary: '#D4AF37',    // Royal Gold
    accent1: '#8B5CF6',      // Violet
    accent2: '#FDF4DC',      // Ivory
    luxury: '#FFD700',       // Pure Gold
    textDark: '#1F1B2E',
    textLight: '#6B5B95',
    white: '#ffffff',
    black: '#1a1a1a',
  },
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"Inter", sans-serif',
  },
  spacing: {
    section: '6rem',
    container: '1280px',
  },
  shadows: {
    soft: '0 4px 20px rgba(0, 0, 0, 0.06)',
    medium: '0 8px 30px rgba(0, 0, 0, 0.08)',
    lifted: '0 12px 40px rgba(0, 0, 0, 0.12)',
  },
  transitions: {
    default: '0.3s ease',
    slow: '0.5s ease',
  },
}

export type ThemeConfig = typeof themeConfig
