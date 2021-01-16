import React, { useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import PostItem from '../components/Post/PostItem';
import HiDivider from '../components/HiDivider';
import PostListFooter from '../components/Post/PostListFooter';
import PostAppbar from '../components/Post/PostAppbar';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  PostScreenNavigationProp,
  PostScreenRouteProp,
} from '../types/navigation';
import { postOrderAsc } from '../types/post';
import { postStore } from '../store/post';

type PostItemProp = React.ComponentProps<typeof PostItem>;

function renderItem({ item }: { item: PostItemProp }) {
  return <PostItem {...item} />;
}

function keyExtractor(item: PostItemProp) {
  return item.postno.toString();
}

function PostScreen() {
  const route = useRoute<PostScreenRouteProp>();
  const { tid, ordertype = postOrderAsc, authorid } = route.params;

  const navigation = useNavigation<PostScreenNavigationProp>();

  const { colors } = useTheme();

  const usePostStore = useMemo(postStore, []);
  const {
    posts,
    isLoading,
    refreshing,
    page,
    hasNextPage,
    actions,
  } = usePostStore();

  const handleOnLoad = () => {
    if (isLoading || !hasNextPage) {
      return;
    }
    actions.loadPost({ tid, page: page + 1, ordertype });
  };

  useEffect(() => {
    navigation.setOptions({ header: () => <PostAppbar /> });
  }, [navigation]);

  useEffect(() => {
    actions.refreshPost({ tid, ordertype, authorid });
  }, [actions, authorid, ordertype, tid]);

  const ListFooterComponent = useCallback(
    () => <PostListFooter loading={isLoading && !refreshing} />,
    [isLoading, refreshing],
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {refreshing && posts.length === 0 ? (
        <ActivityIndicator size="large" style={styles.container} />
      ) : (
        <>
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={HiDivider}
            onEndReached={handleOnLoad}
            onEndReachedThreshold={0.8}
            onRefresh={() => actions.refreshPost({ tid, ordertype, authorid })}
            refreshing={refreshing}
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
