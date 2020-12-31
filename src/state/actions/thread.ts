import { Forum } from '../../forums';
import { ThreadActionTypes, ThreadItemProps } from '../../types/thread';

export const fetchThreadSent = () => ({
  type: ThreadActionTypes.FETCH_THREAD__SENT,
});

export const fetchThread = (threads: ThreadItemProps[]) => ({
  type: ThreadActionTypes.FETCH_THREAD__FULFILLED,
  payload: { threads },
});

export const refreshThreadSent = () => ({
  type: ThreadActionTypes.REFRESH_THREAD__SENT,
});

export const refreshThreadFulfilled = (threads: ThreadItemProps[]) => ({
  type: ThreadActionTypes.REFRESH_THREAD__FULFILLED,
  payload: { threads },
});

export const setForum = (forum: Forum) => ({
  type: ThreadActionTypes.SET_FORUM,
  payload: { forum },
});
