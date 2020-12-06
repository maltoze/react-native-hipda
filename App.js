import React from 'react';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { Provider as PaperProvider } from 'react-native-paper';

import Navigation from './src/navigation';
import LoginModal from './src/components/LoginModal';

enableScreens();

class App extends React.Component {
  render() {
    return (
      <PaperProvider>
        <Navigation />
        <LoginModal />
      </PaperProvider>
    );
  }
}

export default App;
