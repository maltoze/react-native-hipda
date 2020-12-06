import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '../state/store';
import Theme from '../Theme';

export default function ProfileScreen() {
  const user = useUser();

  return (
    <View style={styles.container}>
      <Text selectable>{user.username}的资料</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.tiny,
  },
});
