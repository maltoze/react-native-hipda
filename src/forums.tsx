import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';

type IconProps = {
  size?: number;
  color?: string;
};

type ForumDeclaration = {
  name: string;
  fid?: number;
  icon?: string | ((props: IconProps) => React.ReactNode);
  needLogin?: boolean;
};

export type Forum =
  | 'All'
  | 'Discovery'
  | 'Geek'
  | 'Palm'
  | 'Eink'
  | 'BS'
  | 'Smartphone';

export const defaultForum = 'All';

const forums: Record<Forum, ForumDeclaration> = {
  All: {
    name: '全部',
    icon: 'view-sequential',
    needLogin: true,
  },
  Discovery: {
    name: 'Discovery',
    fid: 2,
    icon: ({ size, color }: IconProps) => (
      <FontAwesomeIcon name="cc-discover" size={size! - 5} color={color} />
    ),
    needLogin: true,
  },
  BS: {
    name: 'Buy & Sell',
    fid: 6,
    icon: 'cart',
    needLogin: true,
  },
  Eink: {
    name: 'E-INK',
    fid: 59,
    icon: 'book-open',
    needLogin: true,
  },
  Geek: {
    name: 'Geek Talks',
    fid: 7,
    icon: ({ size, color }: IconProps) => (
      <FoundationIcon name="comments" size={size} color={color} />
    ),
  },
  Palm: {
    name: 'PalmOS',
    fid: 12,
    icon: 'cellphone-off',
  },
  Smartphone: {
    name: 'Smartphone',
    fid: 9,
    icon: 'cellphone',
  },
};

export default forums;
