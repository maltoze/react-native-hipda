import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar,
  Caption,
  Subheading,
  Surface,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { getAvatarUrl } from '../api/urls';
import { ThreadItem } from '../types';

interface ThreadProps extends ThreadItem {
  onPress?: () => void;
}

export function Thread(props: ThreadProps) {
  const { onPress, author, title, date } = props;
  return (
    <TouchableRipple onPress={onPress}>
      <Surface style={styles.container}>
        <View style={styles.upContainer}>
          <Avatar.Image
            source={{ uri: getAvatarUrl(author.uid) }}
            size={36}
            style={styles.avatarImg}
          />
          <View>
            <Text>{author.name}</Text>
            <Caption>{date}</Caption>
          </View>
        </View>
        <View>
          <Subheading>{title}</Subheading>
        </View>
      </Surface>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  upContainer: {
    flexDirection: 'row',
  },
  avatarImg: {
    marginRight: 10,
  },
});

export default React.memo(Thread);
