import create from 'zustand';
import { getPostList } from '../api/post';
import { PostItemBaseProps, PostListUrlArgs } from '../types/post';

type State = {
  posts: PostItemBaseProps[];
  page: number;
  isLoading: boolean;
  hasNextPage: boolean;
  refreshing: boolean;
  actions: {
    loadPost: (args: PostListUrlArgs) => Promise<void>;
    refreshPost: (args: PostListUrlArgs) => Promise<void>;
  };
};

export const postStore = () =>
  create<State>((set, get) => ({
    posts: [],
    page: 1,
    isLoading: false,
    hasNextPage: false,
    refreshing: true,
    actions: {
      loadPost: async (args) => {
        set({ isLoading: true });
        const { posts, page } = get();
        const { postList: newPosts, hasNext: hasNextPage } = await getPostList(
          args,
        );
        const toAdd = newPosts.filter(
          (n) => !posts.find((t) => t.postno === n.postno),
        );
        set({
          posts: [...posts, ...toAdd],
          isLoading: false,
          page: page + 1,
          hasNextPage,
        });
      },
      refreshPost: async (args) => {
        set({ refreshing: true });
        const { postList, hasNext: hasNextPage } = await getPostList(args);
        set({ posts: postList, page: 1, refreshing: false, hasNextPage });
      },
    },
  }));
