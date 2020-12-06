import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Theme from '../Theme';

class Splash extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>HiPDA</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...Theme.typography.splash,
  },
});

export default Splash;
