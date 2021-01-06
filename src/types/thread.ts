import { Forum } from '../forums';
import { User } from './user';

export enum ThreadActionTypes {
  FETCH_THREAD__FULFILLED = 'FETCH_THREAD__FULFILLED',
  REFRESH_THREAD__FULFILLED = 'REFRESH_THREAD__FULFILLED',
  FETCH_THREAD__SENT = 'FETCH_THREAD__SENT',
  REFRESH_THREAD__SENT = 'REFRESH_THREAD__SENT',
  SET_FORUM = 'SET_FORUM',
}

export type ThreadItemProps = {
  title: string;
  tid: number;
  author: User;
  date: string;
  comments: number;
  views: number;
  lastpost?: { author: string; date: string };
};

export type ThreadFilter = 86400 | 172800 | 604800 | 259200 | 794800;
export type ThreadOrderby =
  | 'dateline'
  | 'replies'
  | 'views'
  | 'lastpost'
  | 'heats';

export type ThreadState = {
  threads: ThreadItemProps[];
  page: number;
  forum: Forum;
  filter?: ThreadFilter;
  orderby?: ThreadOrderby;
  isLoading: boolean;
  refreshing: boolean;
};

export type ThreadAction = {
  type: ThreadActionTypes;
  payload?: Partial<ThreadState>;
};

export type ThreadListUrlArgs = {
  fid: number;
  page?: number;
  orderby?: ThreadOrderby;
  filter?: ThreadFilter;
};
