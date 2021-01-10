import React, { useMemo, useEffect, useRef, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ThreadItemProps } from '../types/thread';
import ThreadItem from '../components/Thread/ThreadItem';
import forums from '../forums';
import { useSetLoginModalVisible, useUser } from '../state/store';
import HiDivider from '../components/HiDivider';
import ThreadListFooter from '../components/Thread/ThreadListFooter';
import { useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import ThreadAppbar from '../components/Thread/ThreadAppBar';
import { useThreadReducer } from '../state/hooks/thread';
import {
  RouteNames,
  ThreadScreenNavigationProp,
  ThreadScreenRouteProp,
} from '../types/navigation';

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

  const { state, actions } = useThreadReducer(forum);
  const { threads, refreshing, page } = state;
  const { needLogin } = forums[forum];

  const user = useUser();
  const setLoginModalVisible = useSetLoginModalVisible();

  const flatListRef = useRef<FlatList<ThreadProp>>(null);

  useEffect(() => {
    navigation.setOptions({ header: () => <ThreadAppbar /> });
  }, [navigation]);

  useEffect(() => {
    if (!refreshing) {
      flatListRef.current?.scrollToIndex({ animated: true, index: 0 });
    }
  }, [refreshing]);

  useEffect(() => {
    if (user.isGuest && needLogin) {
      setLoginModalVisible(true);
    } else {
      actions.refreshThread();
    }
  }, [actions, needLogin, setLoginModalVisible, user.isGuest]);

  const handleOnLoad = () => {
    actions.loadThread(page + 1);
  };

  const ListFooterComponent = useCallback(
    () => <ThreadListFooter refreshing={refreshing} />,
    [refreshing],
  );

  const threadData = useMemo(
    () =>
      threads.map((thread) => ({
        ...thread,
        onPress: () => {
          navigation.navigate(RouteNames.Post, {
            tid: thread.tid,
            title: thread.title,
            author: thread.author,
          });
        },
      })),
    [navigation, threads],
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <FlatList
        ref={flatListRef}
        data={threadData}
        onRefresh={() => actions.refreshThread()}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={handleOnLoad}
        ItemSeparatorComponent={HiDivider}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(ThreadScreen);
