import React from 'react';
import { postInitialState } from '../state/reducers/post';
import { PostListUrlArgs } from '../types/post';

export const PostContext = React.createContext({
  state: postInitialState,
  actions: {
    loadPost: async ({}: PostListUrlArgs) => {},
    resetPost: () => {},
  },
});
