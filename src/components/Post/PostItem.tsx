import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { PostItemBaseProps, User } from '../../types';
import { PostContent } from './PostContent';
import HiAvatar from '../HiAvatar';

interface PostItemProps extends PostItemBaseProps {
  onPress: () => void;
  onAvatarPress: (user: User) => void;
}

const lockedContent = '提示: 作者被禁止或删除 内容自动屏蔽';

const PostItem = React.memo((props: PostItemProps) => {
  const { author, postno, content, onPress, posttime, onAvatarPress } = props;
  return (
    <TouchableRipple onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.postInfoContainer}>
          <Pressable onPress={() => onAvatarPress(author)}>
            <View style={styles.postInfoView}>
              <HiAvatar user={author} size={36} />
              <Text style={styles.postAuthorText}>{author.username}</Text>
            </View>
          </Pressable>
          <View style={styles.postInfoView}>
            <Text style={styles.postInfoRightText}>{posttime}</Text>
            <Text style={[styles.postInfoRightText, styles.postNoText]}>
              {postno}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          {content ? (
            <PostContent pContent={content} />
          ) : (
            <Text style={styles.lockedText}>{lockedContent}</Text>
          )}
        </View>
      </View>
    </TouchableRipple>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingHorizontal: 8,
  },
  content: {
    paddingVertical: 14,
  },
  postInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postAuthorText: {
    marginLeft: 4,
  },
  postInfoRightText: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  postNoText: {
    minWidth: 24,
    textAlign: 'center',
    marginLeft: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 8,
    borderRadius: 8,
    // fix borderRadius not work on ios
    overflow: 'hidden',
  },
  lockedText: {
    color: 'rgba(0, 0, 0, 0.5)',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
});

export default PostItem;
