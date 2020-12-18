import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  Avatar,
  Caption,
  IconButton,
  Subheading,
  Text,
} from 'react-native-paper';
import { getAvatarUrl } from '../api/urls';
import { ThreadItemProps } from '../types';

interface ThreadProps extends ThreadItemProps {
  onPress?: () => void;
}

function ThreadItem(props: ThreadProps) {
  const { onPress, author, title, date, comments } = props;
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.upContainer}>
          <Avatar.Image
            source={{ uri: getAvatarUrl(author.uid!) }}
            size={36}
            style={styles.avatarImg}
          />
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
