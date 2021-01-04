import { User } from './types/user';

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
