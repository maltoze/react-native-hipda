import { User } from './user';

export type PostItemBaseProps = {
  author: User;
  content: string | null;
  posttime: string;
  postno: number;
};

export type PostState = {
  posts: PostItemBaseProps[];
  page: number;
  isLoading: boolean;
  hasNextPage: boolean;
  ordertype: PostSortOrderType;
  authorid?: number;
};

export const postOrderAsc = 2;
export const postOrderDesc = 1;
export type PostSortOrderType = typeof postOrderAsc | typeof postOrderDesc;

export type PostListUrlArgs = {
  tid: number;
  page?: number;
  ordertype?: PostSortOrderType;
  authorid?: number;
};
