import { Forum } from '../forums';
import { User } from './user';

export type ThreadItemProps = {
  title: string;
  tid: number;
  author: User;
  date: string;
  comments: number;
  views: number;
  forum?: string;
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

export type ThreadListUrlArgs = {
  forum: Forum;
  page?: number;
  orderby?: ThreadOrderby;
  filter?: ThreadFilter;
};
