import { Appearance, ColorSchemeName } from 'react-native';
import create from 'zustand';

type State = {
  colorScheme: ColorSchemeName;
  setColorScheme: (scheme: ColorSchemeName) => void;
};

const useStore = create<State>((set) => {
  return {
    colorScheme: Appearance.getColorScheme(),
    setColorScheme: (colorScheme) => set(() => ({ colorScheme })),
  };
});

const colorScheme = (s: State) => s.colorScheme;
const setColorScheme = (s: State) => s.setColorScheme;

export const useColorScheme = () => useStore(colorScheme);
export const useSetColorScheme = () => useStore(setColorScheme);
