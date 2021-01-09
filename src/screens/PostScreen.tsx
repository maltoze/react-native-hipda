import React, { useEffect, useContext, useCallback, useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { User } from '../types/user';
import PostItem from '../components/Post/PostItem';
import navigate from '../navigation/navigate';
import HiDivider from '../components/HiDivider';
import PostListFooter from '../components/Post/PostListFooter';
import { PostContext } from '../context/PostContext';

type PostItemProp = React.ComponentProps<typeof PostItem>;

function renderItem({ item }: { item: PostItemProp }) {
  return <PostItem {...item} />;
}

function PostScreen({ navigation, route }: StackScreenProps<any>) {
  const { tid } = route.params as any;
  const navigator = navigate(navigation);

  const { colors } = useTheme();

  const { state, actions } = useContext(PostContext);
  const { posts, isLoading, page, hasNextPage, ordertype } = state;

  const handleOnLoad = async () => {
    if (isLoading || !hasNextPage) {
      return;
    }
    actions.loadPost({ tid, page: page + 1, ordertype });
  };

  useEffect(() => {
    actions.loadPost({ tid });
    return () => actions.resetPost();
  }, [actions, tid]);

  const ListFooterComponent = useCallback(
    () => <PostListFooter hasNextPage={hasNextPage} />,
    [hasNextPage],
  );

  const postData = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        onAvatarPress: (user: User) => {
          navigator.openProfile({ user });
        },
      })),
    [navigator, posts],
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {isLoading && !page ? (
        <ActivityIndicator size="large" style={styles.container} />
      ) : (
        <>
          <FlatList
            data={postData}
            renderItem={renderItem}
            keyExtractor={(item) => item.postno.toString()}
            ItemSeparatorComponent={HiDivider}
            onEndReached={handleOnLoad}
            onEndReachedThreshold={0.5}
            ListFooterComponent={ListFooterComponent}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(PostScreen);
