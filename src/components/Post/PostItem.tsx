import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, useTheme, Colors } from 'react-native-paper';
import { PostItemBaseProps } from '../../types/post';
import { PostContent } from './PostContent';
import HiAvatar from '../HiAvatar';
import { User } from '../../types/user';

interface PostItemProps extends PostItemBaseProps {
  onPress?: () => void;
  onAvatarPress: (user: User) => void;
}

const PostItem = React.memo((props: PostItemProps) => {
  const { author, postno, content, onPress, posttime, onAvatarPress } = props;
  const { colors } = useTheme();
  const postInfoRightTextStyle = {
    color: colors.backdrop,
  };
  const postNoTextStyle = {
    backgroundColor: Colors.grey300,
  };
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
            <Text style={postInfoRightTextStyle}>{posttime}</Text>
            <Text
              style={[
                postInfoRightTextStyle,
                postNoTextStyle,
                styles.postNoText,
              ]}>
              {postno}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <PostContent pContent={content} />
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
  postNoText: {
    minWidth: 24,
    textAlign: 'center',
    marginLeft: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    // fix borderRadius not work on ios
    overflow: 'hidden',
  },
});

export default PostItem;
