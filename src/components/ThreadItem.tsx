import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Caption, IconButton, Subheading, Text } from 'react-native-paper';
import { ThreadItemProps } from '../types/thread';
import HiAvatar from './HiAvatar';

interface ThreadProps extends ThreadItemProps {
  onPress?: () => void;
}

function ThreadItem(props: ThreadProps) {
  const { onPress, author, title, date, comments } = props;
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.upContainer}>
          <HiAvatar user={author} style={styles.avatarImg} size={36} />
          <View>
            <Text>{author.username}</Text>
            <View style={styles.rowContainer}>
              <Caption>{date}</Caption>
              <IconButton
                icon="comment-outline"
                size={12}
                style={styles.icon}
              />
              <Caption>{comments}</Caption>
            </View>
          </View>
        </View>
        <View>
          <Subheading>{title}</Subheading>
        </View>
      </View>
    </Pressable>
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    margin: 0,
    marginLeft: 10,
    marginTop: 2,
  },
});

export default React.memo(ThreadItem);
