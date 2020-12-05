import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';

import store from './src/store';
import Navigation from './src/navigation';

enableScreens();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default App;
