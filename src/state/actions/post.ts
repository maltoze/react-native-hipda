import { PostActionTypes, PostState } from '../../types/post';

export const fetchPostSent = () => ({
  type: PostActionTypes.FETCH_POST__SENT,
});

export const fetchPostFulfilled = ({
  posts,
  hasNextPage,
  ordertype,
  tid,
}: Partial<PostState>) => ({
  type: PostActionTypes.FETCH_POST__FULFILLED,
  payload: { posts, hasNextPage, ordertype, tid },
});

export const resetPost = () => ({ type: PostActionTypes.RESET_POST });
