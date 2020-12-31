import React from 'react';
import { Forum } from '../forums';
import { threadInitialState } from '../state/reducers/thread';

export const ThreadContext = React.createContext({
  state: threadInitialState,
  actions: {
    loadThread: async (_fid: number, _page = 1) => {},
    refreshThread: async (_fid: number) => {},
    setForum: (_forum: Forum) => {},
  },
});
