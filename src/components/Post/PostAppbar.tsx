import React from 'react';
import { Platform } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import { postOrderAsc, postOrderDesc } from '../../types/post';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  PostScreenNavigationProp,
  PostScreenRouteProp,
} from '../../types/navigation';
import useVisible from '../../hooks/useVisible';

const moreIcon = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const PostAppbar = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<PostScreenNavigationProp>();
  const route = useRoute<PostScreenRouteProp>();
  const { title, ordertype = postOrderAsc, authorid, author } = route.params;

  const { visible, show: openMenu, hide: closeMenu } = useVisible();

  return (
    <Appbar.Header statusBarHeight={insets.top}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title={title} />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        statusBarHeight={insets.top}
        anchor={
          <Appbar.Action icon={moreIcon} color="white" onPress={openMenu} />
        }>
        <Menu.Item
          title={ordertype === postOrderDesc ? '正序看贴' : '倒序看帖'}
          onPress={() => {
            closeMenu();
            navigation.setParams({
              ordertype:
                ordertype === postOrderDesc ? postOrderAsc : postOrderDesc,
            });
          }}
        />
        <Menu.Item
          title={authorid ? '显示全部' : '只看楼主'}
          onPress={() => {
            closeMenu();
            navigation.setParams({
              authorid: authorid ? undefined : author.uid,
            });
          }}
        />
      </Menu>
    </Appbar.Header>
  );
};

export default React.memo(PostAppbar);
