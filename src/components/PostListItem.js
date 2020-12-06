import React from 'react';
import { PostContent } from './PostContent';
import { getAvatarUrl } from '../api/urls';
import { Image, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Theme from '../Theme';

export default class PostListItem extends React.PureComponent {
  render() {
    const { post } = this.props;
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeaderWrapper}>
          <TouchableOpacity style={styles.itemLeftHeaderContainer}>
            <Image
              source={{ uri: getAvatarUrl(post.author.uid) }}
              style={styles.avatar}
            />
            <Text style={styles.text}>{post.author.name}</Text>
          </TouchableOpacity>
          <View style={styles.itemRightHeaderContainer}>
            <Text>{post.posttime}</Text>
            <Text style={{ marginLeft: Theme.spacing.tiny }}>
              {post.postno}
            </Text>
          </View>
        </View>
        {post.content ? (
          <PostContent pContent={post.content} pNum={post.postno} />
        ) : (
          <Text selectable style={styles.statusText}>
            作者被禁止或删除 内容自动屏蔽
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: Theme.spacing.tiny,
  },
  avatar: {
    width: Theme.specifications.iconSize,
    height: Theme.specifications.iconSize,
    borderRadius: 3,
  },
  itemHeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Theme.spacing.tiny,
  },
  text: {
    color: 'black',
    padding: Theme.spacing.tiny,
  },
  itemLeftHeaderContainer: {
    flexDirection: 'row',
  },
  itemRightHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusText: {
    ...Theme.typography.status,
  },
});
