import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import ThreadList from '../components/ThreadList';
import Theme from '../Theme';

function ThreadListScreen({navigation, route}) {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.primary}
      />
      <ThreadList navigation={navigation} fid={route.params.fid} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ThreadListScreen;
