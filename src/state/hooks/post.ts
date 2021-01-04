import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { getPostList } from '../../api/post';
import useMounted from '../../hooks/useMounted';
import { PostListUrlArgs } from '../../types/post';
import { notifyMessage } from '../../utils/notify';
import { fetchPostFulfilled, fetchPostSent, resetPost } from '../actions/post';
import { postInitialState, postReducer } from '../reducers/post';

export const usePostReducer = () => {
  const [state, dispatch] = useReducer(postReducer, postInitialState);
  const isMounted = useMounted();
  /* global AbortController */
  const abortControllerRef = useRef<AbortController>();
  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  const loadPost = useCallback(
    async ({ tid, page = 1, ordertype = 2 }: PostListUrlArgs) => {
      dispatch(fetchPostSent());
      try {
        abortControllerRef.current = new AbortController();
        const { postList: posts, hasNext: hasNextPage } = await getPostList(
          { tid, page, ordertype },
          abortControllerRef.current,
        );
        isMounted() &&
          dispatch(fetchPostFulfilled({ posts, hasNextPage, ordertype, tid }));
      } catch (error) {
        if (error.name !== 'AbortError') {
          notifyMessage(error.message);
        }
      }
    },
    [isMounted],
  );

  const _resetPost = useCallback(() => {
    dispatch(resetPost());
  }, []);

  const actions = useMemo(
    () => ({
      loadPost,
      resetPost: _resetPost,
    }),
    [_resetPost, loadPost],
  );
  return { state, actions };
};
