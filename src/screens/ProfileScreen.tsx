import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../Theme';
import { User } from '../types';

export default function ProfileScreen({ route }: StackScreenProps<any>) {
  const user = route.params?.user as User;

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
