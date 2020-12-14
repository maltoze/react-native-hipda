import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Caption, Text, TouchableRipple } from 'react-native-paper';
import { PostItemBaseProps } from '../types';
import { getAvatarUrl } from '../api/urls';
import { PostContent } from './PostContent';

interface PostItemProps extends PostItemBaseProps {
  onPress: () => void;
}

const emptyContent = '作者被禁止或删除 内容自动屏蔽';

const PostItem = React.memo((props: PostItemProps) => {
  const { author, postno, content, onPress, posttime } = props;
  return (
    <TouchableRipple onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.postInfoContainer}>
          <View style={styles.postInfoView}>
            <Avatar.Image
              source={{ uri: getAvatarUrl(author.uid) }}
              size={36}
            />
            <Text style={styles.postInfoText}>{author.name}</Text>
          </View>
          <View style={styles.postInfoView}>
            <Text>{posttime}</Text>
            <Text style={styles.postInfoText}>{postno}</Text>
          </View>
        </View>
        {content ? (
          <PostContent pContent={content} />
        ) : (
          <Caption>{emptyContent}</Caption>
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
    paddingBottom: 8,
  },
  postInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postInfoText: {
    marginLeft: 4,
  },
});

export default PostItem;
