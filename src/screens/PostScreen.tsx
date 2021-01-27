import React, { useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ActivityIndicator, FAB, useTheme } from 'react-native-paper';
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
import ReplyModal from '../components/Post/ReplyModal';
import useVisible from '../hooks/useVisible';

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

  const {
    visible: replyModalVisible,
    show: showReplyModal,
    hide: hideReplyModal,
  } = useVisible();

  const {
    visible: replyBtnVisible,
    show: showReplyBtn,
    hide: hideReplyBtn,
  } = useVisible(true);

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

  const handleReplyBtnPress = () => {
    showReplyModal();
    hideReplyBtn();
  };

  const handleReplyModalClose = () => {
    showReplyBtn();
    hideReplyModal();
  };

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
          <FAB
            visible={replyBtnVisible}
            style={styles.fab}
            icon="reply"
            onPress={handleReplyBtnPress}
          />
          <ReplyModal
            tid={tid}
            isVisible={replyModalVisible}
            close={handleReplyModalClose}
            onReplyPost={actions.replyPost}
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default React.memo(PostScreen);
