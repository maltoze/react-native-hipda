import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ThreadItemProps } from '../types/thread';
import ThreadItem from '../components/ThreadItem';
import FlatListBase from '../components/FlatListBase';
import forums from '../forums';
import { useSetLoginModalVisible, useUser } from '../state/store';
import { ThreadContext } from '../context/ThreadContext';

type ThreadProp = React.ComponentProps<typeof ThreadItem>;

function renderItem({ item }: { item: ThreadProp }) {
  return <ThreadItem {...item} />;
}

function keyExtractor(item: ThreadItemProps) {
  return item.tid.toString();
}

function ThreadScreen(props: DrawerScreenProps<any>) {
  const { navigation } = props;

  const { state, actions } = useContext(ThreadContext);
  const { threads, isLoading, refreshing, page, forum } = state;
  const { fid, needLogin } = forums[forum];

  const user = useUser();
  const setLoginModalVisible = useSetLoginModalVisible();
  if (user.isGuest && needLogin) {
    setLoginModalVisible(true);
  }

  useEffect(() => {
    actions.loadThread(fid);
  }, [actions, fid]);

  const handleOnLoad = () => {
    actions.loadThread(fid, page + 1);
  };

  return (
    <View style={styles.container}>
      {isLoading && !page ? (
        <ActivityIndicator size="large" style={styles.container} />
      ) : (
        <FlatListBase
          data={threads.map((thread) => ({
            ...thread,
            onPress: () => {
              navigation.navigate('ThreadDetail', {
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
          maxToRenderPerBatch={50}
          initialNumToRender={20}
          windowSize={61}
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
