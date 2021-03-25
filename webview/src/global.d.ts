import { StateUpdater } from 'preact/hooks';

declare global {
  interface Window {
    hiSetPosts: StateUpdater;
    hiSetTheme: StateUpdater;
  }
}
