import create from 'zustand';
import { getThreadList } from '../api/thread';
import { Forum } from '../forums';
import { ThreadItemProps } from '../types/thread';

type State = {
  threads: ThreadItemProps[];
  page: number;
  isLoading: boolean;
  refreshing: boolean;
  actions: {
    refreshThread: (forum: Forum) => Promise<void>;
    loadThread: (forum: Forum) => Promise<void>;
  };
};

export const useThreadStore = create<State>((set, get) => ({
  threads: [],
  page: 1,
  isLoading: false,
  refreshing: true,
  actions: {
    refreshThread: async (forum: Forum) => {
      set({ refreshing: true });
      const threads = await getThreadList({ forum });
      set({ threads, refreshing: false, page: 1 });
    },
    loadThread: async (forum: Forum) => {
      set({ isLoading: true });
      const { threads, page } = get();
      const newThreads = await getThreadList({ forum, page: page + 1 });
      const toAdd = newThreads.filter(
        (n) => !threads.find((t) => t.tid === n.tid),
      );
      set({
        threads: [...threads, ...toAdd],
        isLoading: false,
        page: page + 1,
      });
    },
  },
}));
