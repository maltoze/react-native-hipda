import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Forum } from '../forums';
import { PostSortOrderType } from './post';
import { User } from './user';

export enum RouteNames {
  Thread = 'Thread',
  Post = 'Post',
}

export type RootStackParamList = {
  [RouteNames.Thread]: { forum: Forum };
  [RouteNames.Post]: {
    tid: number;
    title: string;
    ordertype?: PostSortOrderType;
    authorid?: number;
    author: User;
  };
};

export type ThreadScreenRouteProp = RouteProp<
  RootStackParamList,
  RouteNames.Thread
>;
export type ThreadScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  RouteNames.Thread
>;

export type PostScreenRouteProp = RouteProp<
  RootStackParamList,
  RouteNames.Post
>;
export type PostScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  RouteNames.Post
>;
