import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThreadDetail from '../components/ThreadDetail';

// 帖子详情页
export default function ThreadDetailScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <ThreadDetail navigation={navigation} route={route} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
