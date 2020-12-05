import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

type IconProps = {
  size?: number;
  color?: string;
};

type ForumDeclaration = {
  name: string;
  fid: number;
  icon: (props: IconProps) => React.ReactNode;
};

export type ForumId = 'Discovery' | 'Geek' | 'Palm';

const forums: Record<ForumId, ForumDeclaration> = {
  Discovery: {
    name: 'Discovery',
    fid: 2,
    icon: ({ size, color }: IconProps) => (
      <FontAwesomeIcon name="cc-discover" size={size! - 5} color={color} />
    ),
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
    fid: 7,
    icon: ({ size, color }: IconProps) => (
      <MaterialIcon name="smartphone" size={size} color={color} />
    ),
  },
};

export default forums;
