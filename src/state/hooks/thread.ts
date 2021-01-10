import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { getThreadList } from '../../api/thread';
import { Forum } from '../../forums';
import useMounted from '../../hooks/useMounted';
import { notifyMessage } from '../../utils/notify';
import {
  fetchThread,
  fetchThreadSent,
  refreshThreadFulfilled,
  refreshThreadSent,
} from '../actions/thread';
import { threadInitialState, threadReducer } from '../reducers/thread';

const initThreadState = (forum: Forum) => {
  return { ...threadInitialState, forum };
};

export const useThreadReducer = (forum: Forum) => {
  const [state, dispatch] = useReducer(threadReducer, forum, initThreadState);
  const isMounted = useMounted();
  const { filter, orderby } = state;
  /* global AbortController */
  const abortControllerRef = useRef<AbortController>();
  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  const loadThread = useCallback(
    async (page = 1) => {
      dispatch(fetchThreadSent());
      try {
        abortControllerRef.current = new AbortController();
        const threads = await getThreadList(
          { forum, page, filter, orderby },
          abortControllerRef.current,
        );
        isMounted() && dispatch(fetchThread(threads));
      } catch (error) {
        if (error.name !== 'AbortError') {
          notifyMessage(error.message);
        }
      }
    },
    [forum, filter, isMounted, orderby],
  );

  const refreshThread = useCallback(async () => {
    dispatch(refreshThreadSent());
    try {
      abortControllerRef.current = new AbortController();
      const threads = await getThreadList(
        { forum },
        abortControllerRef.current,
      );
      isMounted() && dispatch(refreshThreadFulfilled(threads));
    } catch (error) {
      if (error.name !== 'AbortError') {
        notifyMessage(error.message);
      }
    }
  }, [forum, isMounted]);

  const actions = useMemo(
    () => ({
      loadThread,
      refreshThread,
    }),
    [loadThread, refreshThread],
  );

  return { state, actions };
};
