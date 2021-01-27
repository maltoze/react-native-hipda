import create from 'zustand';
import { getPostList, sendReply } from '../api/post';
import {
  PostItemBaseProps,
  PostListUrlArgs,
  PostReplyUrlParams,
} from '../types/post';

type State = {
  posts: PostItemBaseProps[];
  page: number;
  isLoading: boolean;
  hasNextPage: boolean;
  refreshing: boolean;
  formhash: string;
  actions: {
    loadPost: (args: PostListUrlArgs) => Promise<void>;
    refreshPost: (args: PostListUrlArgs) => Promise<void>;
    replyPost: (args: PostReplyUrlParams, message: string) => Promise<void>;
  };
};

export const postStore = () =>
  create<State>((set, get) => ({
    posts: [],
    page: 1,
    isLoading: false,
    hasNextPage: false,
    refreshing: true,
    formhash: 'bfeb2893',
    actions: {
      loadPost: async (args) => {
        set({ isLoading: true });
        const { posts, page } = get();
        const {
          postList: newPosts,
          hasNext: hasNextPage,
          formhash,
        } = await getPostList(args);
        const toAdd = newPosts.filter(
          (n) => !posts.find((t) => t.postno === n.postno),
        );
        set({
          posts: [...posts, ...toAdd],
          isLoading: false,
          page: page + 1,
          hasNextPage,
          formhash,
        });
      },
      refreshPost: async (args) => {
        set({ refreshing: true });
        const { postList, hasNext: hasNextPage, formhash } = await getPostList(
          args,
        );
        set({
          posts: postList,
          page: 1,
          refreshing: false,
          hasNextPage,
          formhash,
        });
      },
      replyPost: async (args, message) => {
        const { formhash } = get();
        sendReply(args, { message, formhash });
      },
    },
  }));
