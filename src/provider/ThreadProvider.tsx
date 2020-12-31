import React, { PropsWithChildren } from 'react';
import { ThreadContext } from '../context/ThreadContext';
import { useThreadReducer } from '../state/hooks/thread';

export const ThreadProvider = ({ children }: PropsWithChildren<{}>) => {
  const { state, actions } = useThreadReducer();
  return (
    <ThreadContext.Provider value={{ state, actions }}>
      {children}
    </ThreadContext.Provider>
  );
};
