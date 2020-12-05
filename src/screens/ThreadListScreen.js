import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThreadList from '../components/ThreadList';

export default function ThreadListScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <ThreadList navigation={navigation} fid={route.params.fid} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
