import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import ThreadList from '../components/ThreadList';
import forums, { Forum } from '../forums';

export default function ThreadListScreen({
  navigation,
  route,
}: DrawerScreenProps<any>) {
  const { forum } = route.params as { forum: Forum };
  const { fid } = forums[forum];
  return (
    <View style={styles.container}>
      <ThreadList navigation={navigation} fid={fid} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
