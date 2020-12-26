import React, { useCallback, useReducer } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ActivityIndicator } from 'react-native-paper';
import { PostActionTypes, PostItemBaseProps, User } from '../types';
import { getThreadDetail } from '../parser/ThreadDetailParser';
import useCancelToken from '../hooks/useCancelToken';
import useMounted from '../hooks/useMounted';
import PostItem from '../components/Post/PostItem';
import { useFocusEffect } from '@react-navigation/native';
import navigate from '../navigation/navigate';
import HiDivider from '../components/HiDivider';
import PostListFooter from '../components/Post/PostListFooter';

type State = {
  posts: PostItemBaseProps[];
  page: number;
  isLoading: boolean;
  hasNextPage: boolean;
};

type Action = {
  type: PostActionTypes;
  payload?: Partial<State>;
};

type PostItemProp = React.ComponentProps<typeof PostItem>;

const initialState = {
  posts: [],
  page: 0,
  isLoading: true,
  hasNextPage: true,
};

function postReducer(state: State, action: Action) {
  const { payload } = action;
  switch (action.type) {
    case PostActionTypes.FETCH_POST:
      const { posts = [], hasNextPage = true } = { ...payload };
      const toAdd = posts.filter(
        (r: PostItemBaseProps) =>
          !state.posts.find((s) => s.postno === r.postno),
      );
      return {
        ...state,
        posts: [...state.posts, ...toAdd],
        page: hasNextPage ? state.page + 1 : state.page,
        isLoading: false,
        hasNextPage,
      };
    case PostActionTypes.FETCH_POST__SENT:
      return { ...state, isLoading: true };
    default:
      throw new Error('Unknown action type');
  }
}

function renderItem({ item }: { item: PostItemProp }) {
  return <PostItem {...item} />;
}

function PostScreen({ navigation, route }: StackScreenProps<any>) {
  const { tid } = route.params as any;
  const navigator = navigate(navigation);

  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    postReducer,
    initialState,
  );
  const { posts, isLoading, page, hasNextPage } = state;
  const cancelToken = useCancelToken();
  const isMounted = useMounted();

  const handleOnLoad = async () => {
    if (isLoading || !hasNextPage) {
      return;
    }
    dispatch({ type: PostActionTypes.FETCH_POST__SENT });
    const data = await getThreadDetail({
      tid,
      page: page + 1,
      cancelToken,
    });
    const { postList, hasNext } = data;
    isMounted() &&
      dispatch({
        type: PostActionTypes.FETCH_POST,
        payload: { posts: postList, hasNextPage: hasNext },
      });
  };

  useFocusEffect(
    useCallback(() => {
      const fetchPostAsync = async () => {
        const data = await getThreadDetail({
          tid,
          cancelToken,
        });
        const { postList, hasNext } = data;
        isMounted() &&
          dispatch({
            type: PostActionTypes.FETCH_POST,
            payload: { posts: postList, hasNextPage: hasNext },
          });
      };
      fetchPostAsync();
    }, [cancelToken, isMounted, tid]),
  );

  return (
    <View style={styles.container}>
      {isLoading && !page ? (
        <ActivityIndicator size="large" style={styles.container} />
      ) : (
        <FlatList
          data={
            posts &&
            posts.map((post) => ({
              ...post,
              onAvatarPress: (user: User) => {
                navigator.openProfile({ user });
              },
            }))
          }
          renderItem={renderItem}
          keyExtractor={(item) => item.postno.toString()}
          initialNumToRender={10}
          ItemSeparatorComponent={HiDivider}
          onEndReached={handleOnLoad}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<PostListFooter hasNextPage={hasNextPage} />}
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

export default React.memo(PostScreen);
