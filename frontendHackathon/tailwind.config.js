/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'Aptos', 'Segoe UI', 'sans-serif'],
        body: ['Manrope', 'Aptos', 'Segoe UI', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#ffe5e5',
          100: '#ffb3b3',
          200: '#ff8080',
          300: '#ff4d4d',
          400: '#ff1a1a',
          500: '#e60000',
          600: '#b30000',
          700: '#800000',
          800: '#660000',
          900: '#4d0000'
        },
        ocean: {
          50: '#eff9ff',
          100: '#dff1ff',
          200: '#b8e4ff',
          300: '#7fd1ff',
          400: '#39b7ff',
          500: '#1496f0',
          600: '#0876cc',
          700: '#0a5ea5',
          800: '#104f86',
          900: '#13436f'
        },
        slate: {
          950: '#09111f'
        }
      },
      boxShadow: {
        panel: '0 18px 45px -24px rgba(14, 70, 53, 0.45)',
        soft: '0 12px 30px -22px rgba(15, 23, 42, 0.25)'
      },
      backgroundImage: {
        'hero-mesh':
          'radial-gradient(circle at top left, rgba(79, 192, 144, 0.24), transparent 42%), radial-gradient(circle at top right, rgba(20, 150, 240, 0.18), transparent 34%), linear-gradient(135deg, rgba(255,255,255,0.96), rgba(240,249,255,0.92))'
      }
    }
  },
  plugins: []
}
