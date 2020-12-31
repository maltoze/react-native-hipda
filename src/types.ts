export type User = {
  username?: string;
  uid?: number;
  isGuest?: boolean;
  avatar?: string;
};

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
