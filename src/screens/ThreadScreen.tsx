import React, { useMemo, useEffect, useRef, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ThreadItemProps } from '../types/thread';
import ThreadItem from '../components/Thread/ThreadItem';
import forums from '../forums';
import { useSetLoginModalVisible, useUser } from '../store/user';
import HiDivider from '../components/HiDivider';
import ThreadListFooter from '../components/Thread/ThreadListFooter';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import ThreadAppbar from '../components/Thread/ThreadAppbar';
import {
  RouteNames,
  ThreadScreenNavigationProp,
  ThreadScreenRouteProp,
} from '../types/navigation';
import { useThreadStore } from '../store/thread';
import { navigateOneTime } from '../navigation/navigate';

type ThreadProp = React.ComponentProps<typeof ThreadItem>;

function renderItem({ item }: { item: ThreadProp }) {
  return <ThreadItem {...item} />;
}

function keyExtractor(item: ThreadItemProps) {
  return item.tid.toString();
}

function ThreadScreen() {
  const navigation = useNavigation<ThreadScreenNavigationProp>();

  const route = useRoute<ThreadScreenRouteProp>();
  const { forum } = route.params;

  const { colors } = useTheme();

  const { threads, refreshing, actions, isLoading } = useThreadStore();
  const { needLogin } = forums[forum];

  const user = useUser();
  const setLoginModalVisible = useSetLoginModalVisible();

  const flatListRef = useRef<FlatList<ThreadProp>>(null);

  useEffect(() => {
    navigation.setOptions({ header: () => <ThreadAppbar /> });
  }, [navigation]);

  useEffect(() => {
    if (!refreshing) {
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [refreshing]);

  useEffect(() => {
    if (user.isGuest && needLogin) {
      setLoginModalVisible(true);
    } else {
      actions.refreshThread(forum);
    }
  }, [actions, forum, needLogin, setLoginModalVisible, user.isGuest]);

  const handleOnLoad = () => {
    if (!isLoading) {
      actions.loadThread(forum);
    }
  };

  const handleOnRefresh = () => {
    actions.refreshThread(forum);
  };

  const ListFooterComponent = useCallback(
    () => <ThreadListFooter loading={refreshing || isLoading} />,
    [isLoading, refreshing],
  );

  const threadData = useMemo(
    () =>
      threads.map((thread) => ({
        ...thread,
        onPress: navigateOneTime(() => {
          navigation.push(RouteNames.Post, {
            tid: thread.tid,
            title: thread.title,
            author: thread.author,
          });
        }),
      })),
    [navigation, threads],
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {refreshing && threadData.length === 0 ? (
        <ActivityIndicator size="large" style={styles.container} />
      ) : (
        <FlatList
          ref={flatListRef}
          data={threadData}
          onRefresh={handleOnRefresh}
          refreshing={refreshing}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={handleOnLoad}
          onEndReachedThreshold={1}
          ItemSeparatorComponent={HiDivider}
          ListFooterComponent={ListFooterComponent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(ThreadScreen);
