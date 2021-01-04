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
  setForum,
} from '../actions/thread';
import { threadInitialState, threadReducer } from '../reducers/thread';

export const useThreadReducer = () => {
  const [state, dispatch] = useReducer(threadReducer, threadInitialState);
  const isMounted = useMounted();
  const { filter, orderby } = state;
  /* global AbortController */
  const abortControllerRef = useRef<AbortController>();
  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  const loadThread = useCallback(
    async (fid: number, page = 1) => {
      dispatch(fetchThreadSent());
      try {
        abortControllerRef.current = new AbortController();
        const threads = await getThreadList(
          { fid, page, filter, orderby },
          abortControllerRef.current,
        );
        isMounted() && dispatch(fetchThread(threads));
      } catch (error) {
        if (error.name !== 'AbortError') {
          notifyMessage(error.message);
        }
      }
    },
    [filter, isMounted, orderby],
  );

  const refreshThread = useCallback(
    async (fid: number) => {
      dispatch(refreshThreadSent());
      try {
        abortControllerRef.current = new AbortController();
        const threads = await getThreadList(
          { fid },
          abortControllerRef.current,
        );
        isMounted() && dispatch(refreshThreadFulfilled(threads));
      } catch (error) {
        if (error.name !== 'AbortError') {
          notifyMessage(error.message);
        }
      }
    },
    [isMounted],
  );

  const _setForum = useCallback((forum: Forum) => {
    if (!abortControllerRef.current?.signal.aborted) {
      abortControllerRef.current?.abort();
    }
    dispatch(setForum(forum));
  }, []);

  const actions = useMemo(
    () => ({
      loadThread,
      refreshThread,
      setForum: _setForum,
    }),
    [_setForum, loadThread, refreshThread],
  );

  return { state, actions };
};
