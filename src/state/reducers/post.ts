import {
  PostAction,
  PostState,
  PostActionTypes,
  PostItemBaseProps,
} from '../../types/post';

export const postInitialState: PostState = {
  posts: [],
  page: 0,
  isLoading: true,
  hasNextPage: true,
  ordertype: 2,
};

export const postReducer = (
  state: PostState,
  action: PostAction,
): PostState => {
  const { payload } = action;
  switch (action.type) {
    case PostActionTypes.FETCH_POST__FULFILLED:
      const { posts = [], hasNextPage = true, ordertype, tid } = {
        ...payload,
      };
      const toAdd = posts.filter(
        (r: PostItemBaseProps) =>
          !state.posts.find((s) => s.postno === r.postno),
      );
      let newPosts;
      if (ordertype !== state.ordertype) {
        newPosts = posts;
      } else {
        newPosts = [...state.posts, ...toAdd];
      }
      return {
        posts: newPosts,
        page: hasNextPage ? state.page + 1 : state.page,
        isLoading: false,
        hasNextPage,
        ordertype: ordertype || 2,
        tid,
      };
    case PostActionTypes.FETCH_POST__SENT:
      return { ...state, isLoading: true };
    case PostActionTypes.RESET_POST:
      return { ...postInitialState };
    default:
      throw new Error('Unknown action type');
  }
};
