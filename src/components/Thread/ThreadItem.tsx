import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import {
  Caption,
  IconButton,
  Subheading,
  Text,
  useTheme,
} from 'react-native-paper';
import { ThreadItemProps } from '../../types/thread';
import HiAvatar from '../HiAvatar';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

interface ThreadProps extends ThreadItemProps {
  onPress?: () => void;
}

function ThreadItem(props: ThreadProps) {
  const { colors } = useTheme();

  const { onPress, author, title, date, comments, views, forum } = props;
  const relativeTime = dayjs(date).isToday()
    ? '今天'
    : dayjs(date).isYesterday()
    ? '昨天'
    : dayjs(date).fromNow();

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <View style={styles.upContainer}>
          <View style={styles.rowContainer}>
            <HiAvatar user={author} style={styles.avatarImg} size={36} />
            <View>
              <Text>{author.username}</Text>
              <View style={styles.rowContainer}>
                <Caption>{relativeTime}</Caption>
                <View style={[styles.rowContainer, styles.nums]}>
                  <IconButton
                    icon="forum-outline"
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
          {forum ? (
            <Text style={[styles.tag, { backgroundColor: colors.background }]}>
              {forum}
            </Text>
          ) : null}
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
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  upContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  avatarImg: {
    marginRight: 10,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  icon: {
    margin: 0,
    marginLeft: 4,
    marginTop: 2,
  },
  nums: {
    alignItems: 'center',
    marginLeft: 12,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});

export default React.memo(ThreadItem);
