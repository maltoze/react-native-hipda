import React, { useCallback, useReducer } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ActivityIndicator } from 'react-native-paper';
import FlatListBase from '../components/FlatListBase';
import { PostActionTypes, PostItemBaseProps, User } from '../types';
import { getThreadDetail } from '../parser/ThreadDetailParser';
import useCancelToken from '../hooks/useCancelToken';
import useMounted from '../hooks/useMounted';
import PostItem from '../components/Post/PostItem';
import { useFocusEffect } from '@react-navigation/native';
import navigate from '../navigation/navigate';

type State = {
  posts: PostItemBaseProps[];
  page?: number;
  isLoading?: boolean;
};

type Action = {
  type: PostActionTypes;
  payload?: State;
};

type PostItemProp = React.ComponentProps<typeof PostItem>;

const initialState = {
  posts: [],
  page: 0,
  isLoading: true,
};

function postReducer(state: State, action: Action) {
  const { payload } = action;
  switch (action.type) {
    case PostActionTypes.FETCH_POST:
      const posts = payload ? payload.posts : [];
      const toAdd = posts.filter(
        (r: PostItemBaseProps) =>
          !state.posts.find((s) => s.postno === r.postno),
      );
      return {
        ...state,
        posts: [...state.posts, ...toAdd],
        page: state.page ? state.page + 1 : 1,
        isLoading: false,
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
  const { posts, isLoading, page } = state;
  const cancelToken = useCancelToken();
  const isMounted = useMounted();

  useFocusEffect(
    useCallback(() => {
      const fetchPostAsync = async () => {
        const data = await getThreadDetail({
          tid,
          cancelToken,
        });
        const { postList } = data;
        isMounted() &&
          dispatch({
            type: PostActionTypes.FETCH_POST,
            payload: { posts: postList },
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
        <FlatListBase
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
          initialNumToRender={1}
          maxToRenderPerBatch={6}
          windowSize={11}
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
