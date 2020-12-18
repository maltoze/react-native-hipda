import React, { useCallback, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Appbar, Menu } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NavigationProp } from '@react-navigation/native';
import HomeBarContent from './HomeBarContent';
import forums, { Forum } from '../forums';

type HomeBarProps = {
  navigation: NavigationProp<any>;
  title?: string;
  onSetForum: (forum: Forum) => void;
};

function HomeBar(props: HomeBarProps) {
  const insets = useSafeAreaInsets();
  const { title, navigation, onSetForum } = props;

  const [visible, setVisible] = useState(false);
  const openMenu = useCallback(() => setVisible(true), []);
  const closeMenu = useCallback(() => setVisible(false), []);

  const forumMenuItems = useMemo(() => {
    return (Object.keys(forums) as Forum[]).map((forumId) => (
      <Menu.Item
        onPress={() => {
          closeMenu();
          onSetForum(forumId);
        }}
        title={forums[forumId].name}
        key={`menu-${forumId}`}
        icon={forums[forumId].icon}
      />
    ));
  }, [closeMenu, onSetForum]);

  return (
    <Appbar.Header statusBarHeight={insets.top}>
      <Appbar.Action
        icon="menu"
        onPress={() => (navigation as DrawerNavigationProp<{}>).openDrawer()}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        statusBarHeight={insets.top}
        anchor={<HomeBarContent title={title} onPress={openMenu} />}>
        {forumMenuItems}
      </Menu>
    </Appbar.Header>
  );
}

export default React.memo(HomeBar);
