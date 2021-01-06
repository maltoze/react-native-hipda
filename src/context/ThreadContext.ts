import React from 'react';
import { Forum } from '../forums';
import { threadInitialState } from '../state/reducers/thread';

export const ThreadContext = React.createContext({
  state: threadInitialState,
  actions: {
    loadThread: async (_forum: Forum, _page = 1) => {},
    refreshThread: async (_forum: Forum) => {},
    setForum: (_forum: Forum) => {},
  },
});
