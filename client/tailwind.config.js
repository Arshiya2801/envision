/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0D17',
        surface: '#141726',
        'surface-2': '#1C2033',
        border: '#2A2F45',
        text: '#E6E8F2',
        muted: '#9AA0B8',
        primary: { DEFAULT: '#6C5CE7', hover: '#7D6FF0' },
        accent: '#3B82F6',
        success: '#22C55E',
        warning: '#F59E0B',
        info: '#3B82F6',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
