import React from 'react';
import {AppContainer} from './src/Routes';
import {Provider} from 'react-redux';
import store from './src/store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
