import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../Theme';
import Divider from './HiDivider';

export class FooterEnd extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Divider />
        <Text style={styles.text} selectable={true}>
          全部加载完成
        </Text>
      </View>
    );
  }
}

export class FooterLoading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Divider />
        <Text style={styles.text}>加载中...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  text: {
    marginTop: Theme.spacing.small,
    marginBottom: Theme.spacing.base,
    alignSelf: 'center',
    ...Theme.typography.status,
  },
});
