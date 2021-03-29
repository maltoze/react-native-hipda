import { StateUpdater } from 'preact/hooks';

declare global {
  interface Window {
    hiSetPostsData: StateUpdater;
    hiSetTheme: StateUpdater;
  }
}
