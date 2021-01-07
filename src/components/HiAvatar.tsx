import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Buffer } from 'buffer';
import { User } from '../types/user';
import FastImage from 'react-native-fast-image';

type HiAvatarProps = {
  user: User;
  style?: StyleProp<ViewStyle>;
  size?: number;
};

const HiAvatar = (props: HiAvatarProps) => {
  const { user, style, size = 64 } = props;
  if (user.avatar) {
    return (
      <Avatar.Image
        source={() => (
          <FastImage
            source={{ uri: user.avatar }}
            style={{ width: size, height: size, borderRadius: size / 2 }}
          />
        )}
        size={size}
        style={style}
      />
    );
  } else {
    const label = Buffer.from(user.username || '匿名')
      .slice(0, 3)
      .toString();
    return <Avatar.Text label={label} size={size} style={style} />;
  }
};

export default React.memo(HiAvatar);
