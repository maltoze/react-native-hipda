import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, ColorSchemeName } from 'react-native';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  colorScheme: ColorSchemeName;
  setColorScheme: (scheme: ColorSchemeName) => void;
};

const useStore = create<State>(
  persist(
    (set) => ({
      colorScheme: Appearance.getColorScheme(),
      setColorScheme: (colorScheme) => set(() => ({ colorScheme })),
    }),
    { name: 'preferences-storage', getStorage: () => AsyncStorage },
  ),
);

const colorScheme = (s: State) => s.colorScheme;
const setColorScheme = (s: State) => s.setColorScheme;

export const useColorScheme = () => useStore(colorScheme);
export const useSetColorScheme = () => useStore(setColorScheme);
