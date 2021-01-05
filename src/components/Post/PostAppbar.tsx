import React, { useContext, useState } from 'react';
import { Platform } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import { Appbar, Menu } from 'react-native-paper';
import { PostContext } from '../../context/PostContext';
import { postOrderAsc, postOrderDesc } from '../../types/post';

const moreIcon = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

interface PostAppbarProps extends StackHeaderProps {
  tid: number;
}

const PostAppbar = ({ scene, insets, tid }: PostAppbarProps) => {
  const {
    descriptor: { navigation, options },
  } = scene;
  const [menuVisible, setMenuVisible] = useState(false);
  const {
    state: { ordertype },
    actions,
  } = useContext(PostContext);

  return (
    <Appbar.Header statusBarHeight={insets.top}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title={options.title} />
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        statusBarHeight={insets.top}
        anchor={
          <Appbar.Action
            icon={moreIcon}
            color="white"
            onPress={() => setMenuVisible(true)}
          />
        }>
        <Menu.Item
          title={ordertype === postOrderDesc ? '正序看贴' : '倒序看帖'}
          onPress={() => {
            actions.resetPost();
            actions.loadPost({
              tid,
              ordertype:
                ordertype === postOrderDesc ? postOrderAsc : postOrderDesc,
            });
            setMenuVisible(false);
          }}
        />
      </Menu>
    </Appbar.Header>
  );
};

export default React.memo(PostAppbar);
