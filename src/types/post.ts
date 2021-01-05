import { User } from './user';

export type PostItemBaseProps = {
  author: User;
  content: string | null;
  posttime: string;
  postno: number;
};

export enum PostActionTypes {
  FETCH_POST__FULFILLED = 'FETCH_POST__FULFILLED',
  FETCH_POST__SENT = 'FETCH_POST__SENT',
  RESET_POST = 'RESET_POST',
}

export type PostState = {
  posts: PostItemBaseProps[];
  page: number;
  isLoading: boolean;
  hasNextPage: boolean;
  ordertype: PostSortOrderType;
  tid?: number;
};

export type PostAction = {
  type: PostActionTypes;
  payload?: Partial<PostState>;
};

export const postOrderAsc = 2;
export const postOrderDesc = 1;
type PostSortOrderType = typeof postOrderAsc | typeof postOrderDesc;

export type PostListUrlArgs = {
  tid: number;
  page?: number;
  ordertype?: PostSortOrderType;
  authorid?: number;
};
