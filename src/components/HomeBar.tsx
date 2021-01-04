import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Appbar, Menu } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NavigationProp } from '@react-navigation/native';
import HomeBarContent from './HomeBarContent';
import forums, { defaultForum, Forum } from '../forums';
import { ThreadContext } from '../context/ThreadContext';

type HomeBarProps = {
  navigation: NavigationProp<any>;
  title?: string;
};

function HomeBar(props: HomeBarProps) {
  const insets = useSafeAreaInsets();
  const { navigation } = props;
  const {
    state: { forum },
    actions,
  } = useContext(ThreadContext);

  const [visible, setVisible] = useState(false);
  const openMenu = useCallback(() => setVisible(true), []);
  const closeMenu = useCallback(() => setVisible(false), []);

  const forumRef = useRef<Forum>(defaultForum);

  const forumMenuItems = useMemo(() => {
    return (Object.keys(forums) as Forum[]).map((forumId) => (
      <Menu.Item
        onPress={() => {
          closeMenu();
          if (forumRef.current !== forumId) {
            actions.setForum(forumId);
            forumRef.current = forumId;
          }
        }}
        title={forums[forumId].name}
        key={`menu-${forumId}`}
        icon={forums[forumId].icon}
      />
    ));
  }, [actions, closeMenu]);

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
        anchor={
          <HomeBarContent title={forums[forum].name} onPress={openMenu} />
        }>
        {forumMenuItems}
      </Menu>
    </Appbar.Header>
  );
}

export default React.memo(HomeBar);
