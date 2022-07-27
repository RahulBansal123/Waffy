module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './utils/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'className'
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#fff8e1',
          100: '#ffaf7a',
          200: '#ff9d5c',
          300: '#ff8b3d',
          400: '#ff781f',
          500: '#ff6600',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
