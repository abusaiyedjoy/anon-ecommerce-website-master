import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B8A',
          dark: '#E8536A',
          light: '#FFE8EE',
          50: '#FFF0F3',
          100: '#FFE0E7',
          200: '#FFB3C4',
          300: '#FF85A1',
          400: '#FF6B8A',
          500: '#FF4D6D',
          600: '#E8536A',
          700: '#C73F54',
          800: '#A62C3E',
          900: '#85192A',
        },
        surface: '#F8F8F8',
        border: '#E8E8E8',
        'text-primary': '#1A1A2E',
        'text-secondary': '#666666',
        gold: '#FFA500',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
