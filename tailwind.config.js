/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent1: 'var(--color-accent1)',
        accent2: 'var(--color-accent2)',
        luxury: 'var(--color-luxury)',
        'text-dark': 'var(--color-text-dark)',
        'text-light': 'var(--color-text-light)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.06)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.08)',
        lifted: '0 12px 40px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
