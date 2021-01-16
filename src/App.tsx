import React from 'react';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

import Navigation from './navigation';
import LoginModal from './components/LoginModal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from './store/preferences';
import { DarkTheme, LightTheme } from './styles/Theme';

enableScreens();

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Navigation />
        <LoginModal />
        <StatusBar style="light" />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
