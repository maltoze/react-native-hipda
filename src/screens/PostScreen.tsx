import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import PostItem from '../components/Post/PostItem';
import HiDivider from '../components/HiDivider';
import PostListFooter from '../components/Post/PostListFooter';
import { usePostReducer } from '../state/hooks/post';
import PostAppbar from '../components/Post/PostAppbar';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  PostScreenNavigationProp,
  PostScreenRouteProp,
} from '../types/navigation';
import { postOrderAsc } from '../types/post';

type PostItemProp = React.ComponentProps<typeof PostItem>;

function renderItem({ item }: { item: PostItemProp }) {
  return <PostItem {...item} />;
}

function PostScreen() {
  const route = useRoute<PostScreenRouteProp>();
  const { tid, ordertype = postOrderAsc, authorid } = route.params;

  const navigation = useNavigation<PostScreenNavigationProp>();

  const { colors } = useTheme();

  const { state, actions } = usePostReducer();
  const { posts, isLoading, page, hasNextPage } = state;

  const handleOnLoad = async () => {
    if (isLoading || !hasNextPage) {
      return;
    }
    actions.loadPost({ tid, page: page + 1, ordertype });
  };

  useEffect(() => {
    navigation.setOptions({ header: () => <PostAppbar /> });
  }, [navigation]);

  useEffect(() => {
    actions.loadPost({ tid, ordertype, authorid });
  }, [actions, authorid, ordertype, tid]);

  const ListFooterComponent = useCallback(
    () => <PostListFooter hasNextPage={hasNextPage} />,
    [hasNextPage],
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {isLoading && !page ? (
        <ActivityIndicator size="large" style={styles.container} />
      ) : (
        <>
          <FlatList
            data={posts}
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
