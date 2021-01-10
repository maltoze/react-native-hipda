import {
  PostAction,
  PostState,
  PostActionTypes,
  PostItemBaseProps,
  postOrderAsc,
} from '../../types/post';

export const postInitialState: PostState = {
  posts: [],
  page: 0,
  isLoading: true,
  hasNextPage: true,
  ordertype: postOrderAsc,
};

export const postReducer = (
  state: PostState,
  action: PostAction,
): PostState => {
  const { payload } = action;
  switch (action.type) {
    case PostActionTypes.FETCH_POST__FULFILLED:
      const {
        posts = [],
        hasNextPage = true,
        ordertype = postOrderAsc,
        authorid,
      } = {
        ...payload,
      };
      if (authorid !== state.authorid) {
        return {
          posts,
          page: state.page + 1,
          isLoading: false,
          hasNextPage,
          authorid,
          ordertype,
        };
      }
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
        page: state.page + 1,
        isLoading: false,
        hasNextPage,
        ordertype,
        authorid,
      };
    case PostActionTypes.FETCH_POST__SENT:
      return { ...state, isLoading: true };
    case PostActionTypes.RESET_POST:
      return { ...postInitialState };
    default:
      throw new Error('Unknown action type');
  }
};
