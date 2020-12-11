import React, { useEffect, useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { getThreadList } from '../parser/ThreadListParser';
import { ForumActionTypes, ThreadItemProps } from '../types';
import forums, { Forum } from '../forums';
import ThreadItem from '../components/ThreadItem';
import useCancelToken from '../hooks/useCancelToken';
import useMounted from '../hooks/useMounted';
import FlatListBase from '../components/FlatListBase';

type State = {
  threads: ThreadItemProps[];
  page?: number;
  isLoading?: boolean;
  refreshing?: boolean;
};

type Action = {
  type: ForumActionTypes;
  payload?: State;
};

type ThreadProp = React.ComponentProps<typeof ThreadItem>;

const initialState = {
  threads: [],
  page: 0,
  isLoading: true,
  refreshing: false,
};

function forumReducer(state: State, action: Action) {
  const { payload } = action;
  switch (action.type) {
    case ForumActionTypes.FETCH_FORUM:
      const threads = payload ? payload.threads : [];
      const toAdd = threads.filter(
        (r: ThreadItemProps) => !state.threads.find((s) => s.tid === r.tid),
      );
      return {
        ...state,
        threads: [...state.threads, ...toAdd],
        page: state.page ? state.page + 1 : 1,
        isLoading: false,
      };
    case ForumActionTypes.REFRESH_FORUM:
      return {
        ...state,
        threads: payload ? payload.threads : [],
        page: 1,
        refreshing: false,
      };
    case ForumActionTypes.FETCH_FORUM__SENT:
      return { ...state, isLoading: true };
    case ForumActionTypes.REFRESH_FORUM__SENT:
      return { ...state, isLoading: false, refreshing: true };
    default:
      throw new Error('Unknown action type');
  }
}

function renderItem({ item }: { item: ThreadProp }) {
  return <ThreadItem {...item} />;
}

function keyExtractor(item: ThreadItemProps) {
  return item.tid.toString();
}

export default function ThreadScreen({
  navigation,
  route,
}: DrawerScreenProps<any>) {
  const { forum } = route.params as { forum: Forum };
  const { fid } = forums[forum];
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    forumReducer,
    initialState,
  );
  const { threads, isLoading, refreshing, page } = state;
  const cancelToken = useCancelToken();
  const isMounted = useMounted();

  useEffect(() => {
    const fetchForumAsync = async () => {
      const data = await getThreadList({ fid, cancelToken });
      isMounted() &&
        dispatch({
          type: ForumActionTypes.FETCH_FORUM,
          payload: { threads: data },
        });
    };
    fetchForumAsync();
  }, [fid, cancelToken, isMounted]);

  const handleOnLoad = async () => {
    dispatch({ type: ForumActionTypes.FETCH_FORUM__SENT });
    const data = await getThreadList({
      fid,
      cancelToken,
      page: page ? page + 1 : 1,
    });
    isMounted() &&
      dispatch({
        type: ForumActionTypes.FETCH_FORUM,
        payload: { threads: data },
      });
  };

  const handleOnRefresh = async () => {
    dispatch({ type: ForumActionTypes.REFRESH_FORUM__SENT });
    const data = await getThreadList({ fid, cancelToken });
    isMounted() &&
      dispatch({
        type: ForumActionTypes.REFRESH_FORUM,
        payload: { threads: data },
      });
  };

  return (
    <View style={styles.container}>
      {isLoading && !page ? (
        <ActivityIndicator size="large" style={styles.container} />
      ) : (
        <FlatListBase
          data={
            threads &&
            threads.map((thread) => ({
              ...thread,
              onPress: () => {
                navigation.navigate('ThreadDetail', {
                  tid: thread.tid,
                  subject: thread.title,
                });
              },
            }))
          }
          onRefresh={handleOnRefresh}
          refreshing={refreshing}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={handleOnLoad}
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