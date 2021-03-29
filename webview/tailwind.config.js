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
        light: '#ffffff',
        dark: '#121212',
        gray: {
          darkest: '#212121',
          dark: '#616161',
          DEFAULT: '#bdbdbd',
          light: '#eeeeee',
          lightest: '#f5f5f5',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
