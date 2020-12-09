import React from 'react';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import Navigation from './navigation';
import LoginModal from './components/LoginModal';
import { SafeAreaProvider } from 'react-native-safe-area-context';

enableScreens();

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Navigation />
        <LoginModal />
        <StatusBar />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
