import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import color from 'color';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      caption: string;
    }
  }
}

export const DarkTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    caption: color(PaperDarkTheme.colors.text).alpha(0.54).rgb().string(),
  },
};
export const LightTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    caption: color(PaperDefaultTheme.colors.text).alpha(0.54).rgb().string(),
  },
};
