export const themeConfig = {
  colors: {
    primary: '#a7ba42',      // Sage Green
    secondary: '#95ccba',    // Mint
    accent1: '#ffdede',      // Blush
    accent2: '#fff0cb',      // Cream
    luxury: '#f2cc84',       // Soft Gold
    textDark: '#2d3e2d',
    textLight: '#6b7c6b',
    white: '#ffffff',
    black: '#1a1a1a',
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
