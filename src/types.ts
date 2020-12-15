export type User = {
  username?: string;
  uid?: number;
  isGuest?: boolean;
};

export type ThreadItemProps = {
  title: string;
  tid: number;
  author: User;
  date: string;
  comments: number;
  lastpost?: { author: string; date: string };
};

export enum ForumActionTypes {
  FETCH_FORUM = 'FETCH_FORUM',
  REFRESH_FORUM = 'REFRESH_FORUM',
  FETCH_FORUM__SENT = 'FETCH_FORUM__SENT',
  REFRESH_FORUM__SENT = 'REFRESH_FORUM__SENT',
}

export type PostItemBaseProps = {
  author: User;
  content: string | null;
  posttime: string;
  postno: number;
};

export enum PostActionTypes {
  FETCH_POST = 'FETCH_POST',
  FETCH_POST__SENT = 'FETCH_POST__SENT',
}
