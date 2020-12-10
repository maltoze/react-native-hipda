export type User = {
  name: string;
  uid: number;
};

export type ThreadItemProp = {
  title: string;
  tid: number;
  author: User;
  date: string;
  nums: string;
};

export enum ForumActionTypes {
  FETCH_FORUM = 'FETCH_FORUM',
  REFRESH_FORUM = 'REFRESH_FORUM',
  FETCH_FORUM__SENT = 'FETCH_FORUM__SENT',
  REFRESH_FORUM__SENT = 'REFRESH_FORUM__SENT',
}
