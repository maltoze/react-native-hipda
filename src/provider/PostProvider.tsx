import React, { PropsWithChildren } from 'react';
import { PostContext } from '../context/PostContext';
import { usePostReducer } from '../state/hooks/post';

export const PostProvider = ({ children }: PropsWithChildren<{}>) => {
  const { state, actions } = usePostReducer();
  return (
    <PostContext.Provider value={{ state, actions }}>
      {children}
    </PostContext.Provider>
  );
};
