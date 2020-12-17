import React, { useCallback, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Appbar, Menu } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import HomeBarContent from './HomeBarContent';
import forums, { Forum } from '../forums';
import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types';

interface HomeBarProps extends DrawerHeaderProps {
  onSetForum: (forum: Forum) => void;
}

function HomeBar(props: HomeBarProps) {
  const insets = useSafeAreaInsets();
  const { scene, onSetForum } = props;
  const { navigation, options } = scene.descriptor;

  return (
    <Appbar.Header statusBarHeight={insets.top}>
      <Appbar.Action
        icon="menu"
        onPress={() => (navigation as DrawerNavigationProp<{}>).openDrawer()}
      />
      <ForumMenu title={options.title} onSetForum={onSetForum} />
    </Appbar.Header>
  );
}

const ForumMenu = React.memo((props: any) => {
  const { title, onSetForum } = props;
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);

  const openMenu = useCallback(() => setVisible(true), []);
  const closeMenu = useCallback(() => setVisible(false), []);
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      statusBarHeight={insets.top}
      anchor={<HomeBarContent title={title} onPress={openMenu} />}>
      {(Object.keys(forums) as Forum[]).map((forumId) => (
        <Menu.Item
          onPress={() => {
            closeMenu();
            onSetForum(forumId);
          }}
          title={forums[forumId].name}
          key={`menu-${forumId}`}
          icon={forums[forumId].icon}
        />
      ))}
    </Menu>
  );
});

export default React.memo(HomeBar);
