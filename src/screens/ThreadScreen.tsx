import React, { useMemo, useContext, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ThreadItemProps } from '../types/thread';
import ThreadItem from '../components/Thread/ThreadItem';
import forums from '../forums';
import { ThreadContext } from '../context/ThreadContext';
import navigate from '../navigation/navigate';
import { useSetLoginModalVisible, useUser } from '../state/store';
import HiDivider from '../components/HiDivider';
import ThreadListFooter from '../components/Thread/ThreadListFooter';
import { useTheme } from 'react-native-paper';

type ThreadProp = React.ComponentProps<typeof ThreadItem>;

function renderItem({ item }: { item: ThreadProp }) {
  return <ThreadItem {...item} />;
}

function keyExtractor(item: ThreadItemProps) {
  return item.tid.toString();
}

function ThreadScreen(props: DrawerScreenProps<any>) {
  const { navigation } = props;
  const navigator = useMemo(() => navigate(navigation), [navigation]);

  const { colors } = useTheme();

  const { state, actions } = useContext(ThreadContext);
  const { threads, refreshing, page, forum } = state;
  const { needLogin } = forums[forum];

  const user = useUser();
  const setLoginModalVisible = useSetLoginModalVisible();

  const flatListRef = useRef<FlatList<ThreadProp>>(null);

  useEffect(() => {
    if (user.isGuest && needLogin) {
      setLoginModalVisible(true);
    } else {
      actions.refreshThread(forum);
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [
    actions,
    forum,
    navigator,
    needLogin,
    setLoginModalVisible,
    user.isGuest,
  ]);

  const handleOnLoad = () => {
    actions.loadThread(forum, page + 1);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <FlatList
        ref={flatListRef}
        data={threads.map((thread) => ({
          ...thread,
          onPress: () => {
            navigator.openPostScreen({
              tid: thread.tid,
              subject: thread.title,
            });
          },
        }))}
        onRefresh={() => actions.refreshThread(forum)}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={handleOnLoad}
        initialNumToRender={15}
        ItemSeparatorComponent={HiDivider}
        ListFooterComponent={() => <ThreadListFooter refreshing={refreshing} />}
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
