import Config from './Config';
const Theme = {};

const colors = {
  primary: '#8f77b5',
};

Theme.spacing = {
  xTiny: 4,
  tiny: 8,
  small: 16,
  base: 24,
  large: 52,
  xLarge: 64,
};

Theme.specifications = {
  smallIconSize: 20,
  iconSize: 40,
  largeIconSize: 54,
  hugeIconSize: 120,

  activityIndicatorSize: Config.isAndroid ? 60 : 'large',
  activitySmallIndicatorSize: Config.isAndroid ? 30 : 'small',
};

Theme.gray = {
  darkest: '#121212',
  darker: '#1a1a1a',
  dark: '#353535',
  light: '#828282',
  lighter: '#cfcfcf',
  lightest: '#f8f8f8',
};

Theme.colors = {
  ...colors,
};

Theme.typography = {
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
    color: Theme.gray.dark,
  },
  status: {
    fontSize: 14,
    color: Theme.gray.light,
  },
  splash: {
    fontSize: 32,
    color: Theme.gray.dark,
  },
};

export default Theme;
