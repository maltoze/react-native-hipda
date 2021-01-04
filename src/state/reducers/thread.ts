import { defaultForum } from '../../forums';
import {
  ThreadAction,
  ThreadActionTypes,
  ThreadItemProps,
  ThreadState,
} from '../../types/thread';

export const threadInitialState: ThreadState = {
  threads: [],
  page: 0,
  forum: defaultForum,
  isLoading: true,
  refreshing: false,
};

export const threadReducer = (
  state: ThreadState,
  action: ThreadAction,
): ThreadState => {
  const { payload } = action;
  switch (action.type) {
    case ThreadActionTypes.FETCH_THREAD__FULFILLED:
      const { threads = [] } = { ...payload };
      const toAdd = threads.filter(
        (r: ThreadItemProps) => !state.threads.find((s) => s.tid === r.tid),
      );
      return {
        ...state,
        threads: [...state.threads, ...toAdd],
        page: state.page ? state.page + 1 : 1,
        isLoading: false,
      };
    case ThreadActionTypes.REFRESH_THREAD__FULFILLED:
      return {
        ...state,
        threads: payload?.threads || [],
        page: 1,
        refreshing: false,
      };
    case ThreadActionTypes.FETCH_THREAD__SENT:
      return { ...state, isLoading: true };
    case ThreadActionTypes.REFRESH_THREAD__SENT:
      return { ...state, isLoading: false, refreshing: true };
    case ThreadActionTypes.SET_FORUM:
      return { ...threadInitialState, forum: payload?.forum || defaultForum };
    default:
      return state;
  }
};