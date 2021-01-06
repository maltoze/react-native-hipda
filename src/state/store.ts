import { Appearance, ColorSchemeName } from 'react-native';
import create from 'zustand';
import { User } from '../types/user';

type State = {
  user: User;
  setUser: (user: User) => void;
  loginModalVisible: boolean;
  setLoginModalVisible: (visible: boolean) => void;
  colorScheme: ColorSchemeName;
  setColorScheme: (scheme: ColorSchemeName) => void;
};

const useStore = create<State>((set) => {
  return {
    user: { isGuest: true },
    setUser: (user: User) => set(() => ({ user })),
    loginModalVisible: false,
    setLoginModalVisible: (visible) =>
      set(() => ({ loginModalVisible: visible })),
    colorScheme: Appearance.getColorScheme(),
    setColorScheme: (colorScheme) => set(() => ({ colorScheme })),
  };
});

const user = (s: State) => s.user;
const setUser = (s: State) => s.setUser;
const loginModalVisible = (s: State) => s.loginModalVisible;
const setLoginModalVisible = (s: State) => s.setLoginModalVisible;
const colorScheme = (s: State) => s.colorScheme;
const setColorScheme = (s: State) => s.setColorScheme;

export const useUser = () => useStore(user);
export const useSetUser = () => useStore(setUser);
export const useLoginModalVisible = () => useStore(loginModalVisible);
export const useSetLoginModalVisible = () => useStore(setLoginModalVisible);
export const useColorScheme = () => useStore(colorScheme);
export const useSetColorScheme = () => useStore(setColorScheme);
