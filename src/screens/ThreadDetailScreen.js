import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import ThreadDetail from '../components/ThreadDetail';
import Theme from '../Theme';

// 帖子详情页
export function ThreadDetailScreen({navigation, route}) {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.primary}
      />
      <ThreadDetail navigation={navigation} route={route} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ThreadDetailScreen;
