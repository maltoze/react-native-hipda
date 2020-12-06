import AsyncStorage from '@react-native-community/async-storage';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  uid?: string;
  username?: string;
  isGuest?: boolean;
};

type State = {
  user: User;
  setUser: (user: User) => void;
  loginModalVisible: boolean;
  setLoginModalVisible: (visible: boolean) => void;
};

const useStore = create<State>(
  persist(
    (set) => {
      return {
        user: { isGuest: true },
        setUser: (user: User) => set(() => ({ user })),
        loginModalVisible: false,
        setLoginModalVisible: (visible) =>
          set(() => ({ loginModalVisible: visible })),
      };
    },
    {
      name: 'hipda',
      storage: AsyncStorage,
    },
  ),
);

const user = (s: State) => s.user;
const setUser = (s: State) => s.setUser;
const loginModalVisible = (s: State) => s.loginModalVisible;
const setLoginModalVisible = (s: State) => s.setLoginModalVisible;

export const useUser = () => useStore(user);
export const useSetUser = () => useStore(setUser);
export const useLoginModalVisible = () => useStore(loginModalVisible);
export const useSetLoginModalVisible = () => useStore(setLoginModalVisible);
