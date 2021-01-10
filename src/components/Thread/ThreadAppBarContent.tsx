import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

type HomeBarContentProps = {
  title?: string;
  onPress: () => void;
};

function ThreadAppbarContent(props: HomeBarContentProps) {
  const { title, onPress } = props;

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <IconButton
          icon="menu-down"
          color="white"
          style={styles.icon}
          size={24}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  icon: {
    margin: 0,
  },
});

export default React.memo(ThreadAppbarContent);
