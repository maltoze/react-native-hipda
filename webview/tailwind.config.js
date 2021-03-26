module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6200ee',
          DEFAULT: '#6200ee',
          dark: '#bb86fc',
        },
        light: '#f6f6f6',
        dark: '#121212',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
