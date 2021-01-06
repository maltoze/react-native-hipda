import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';
import {
  Caption,
  IconButton,
  Subheading,
  Text,
  useTheme,
} from 'react-native-paper';
import { ThreadItemProps } from '../../types/thread';
import HiAvatar from '../HiAvatar';

interface ThreadProps extends ThreadItemProps {
  onPress?: () => void;
}

function ThreadItem(props: ThreadProps) {
  const { onPress, author, title, date, comments, views } = props;

  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <View style={styles.upContainer}>
          <HiAvatar user={author} style={styles.avatarImg} size={36} />
          <View>
            <Text>{author.username}</Text>
            <View style={styles.rowContainer}>
              <Caption>{dayjs().to(dayjs(date))}</Caption>
              <View style={[styles.rowContainer, styles.nums]}>
                <IconButton
                  icon="comment-multiple-outline"
                  size={12}
                  color={colors.caption}
                  style={styles.icon}
                />
                <Caption>{comments}</Caption>
                <IconButton
                  icon="eye-outline"
                  size={12}
                  color={colors.caption}
                  style={styles.icon}
                />
                <Caption>{views}</Caption>
              </View>
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
    paddingHorizontal: 10,
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
    justifyContent: 'space-between',
  },
  icon: {
    margin: 0,
    marginLeft: 4,
    marginTop: 2,
  },
  nums: {
    marginLeft: 12,
  },
});

export default React.memo(ThreadItem);
