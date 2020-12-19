import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Text, TouchableRipple } from 'react-native-paper';
import { PostItemBaseProps, User } from '../types';
import { getAvatarUrl } from '../api/urls';
import { PostContent } from './PostContent';

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
              <Avatar.Image
                source={{ uri: getAvatarUrl(author.uid!) }}
                size={36}
              />
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
        {content ? (
          <PostContent pContent={content} />
        ) : (
          <Text style={styles.lockedText}>{lockedContent}</Text>
        )}
      </View>
    </TouchableRipple>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 10,
    paddingHorizontal: 8,
  },
  postInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
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
