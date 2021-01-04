import React, { useMemo, useContext, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ThreadItemProps } from '../types/thread';
import ThreadItem from '../components/ThreadItem';
import forums from '../forums';
import { ThreadContext } from '../context/ThreadContext';
import navigate from '../navigation/navigate';
import { useSetLoginModalVisible, useUser } from '../state/store';
import HiDivider from '../components/HiDivider';

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

  const { state, actions } = useContext(ThreadContext);
  const { threads, refreshing, page, forum } = state;
  const { fid, needLogin } = forums[forum];

  const user = useUser();
  const setLoginModalVisible = useSetLoginModalVisible();

  const flatListRef = useRef<FlatList<ThreadProp>>(null);

  useEffect(() => {
    if (user.isGuest && needLogin) {
      setLoginModalVisible(true);
    } else {
      actions.refreshThread(fid);
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [actions, fid, navigator, needLogin, setLoginModalVisible, user.isGuest]);

  const handleOnLoad = () => {
    actions.loadThread(fid, page + 1);
  };

  return (
    <View style={styles.container}>
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
        onRefresh={() => actions.refreshThread(fid)}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={handleOnLoad}
        initialNumToRender={15}
        ItemSeparatorComponent={HiDivider}
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
