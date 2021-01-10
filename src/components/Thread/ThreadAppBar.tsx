import React, { useMemo, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Appbar, Menu } from 'react-native-paper';
import {
  DrawerActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ThreadAppbarContent from './ThreadAppBarContent';
import forums, { defaultForum, Forum } from '../../forums';
import {
  ThreadScreenNavigationProp,
  ThreadScreenRouteProp,
} from '../../types/navigation';
import useVisible from '../../hooks/useVisible';

function ThreadAppBar() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ThreadScreenNavigationProp>();

  const route = useRoute<ThreadScreenRouteProp>();
  const { forum } = route.params;
  const forumRef = useRef<Forum>(defaultForum);

  const { visible, show: openMenu, hide: closeMenu } = useVisible();

  const forumMenuItems = useMemo(() => {
    return (Object.keys(forums) as Forum[]).map((forumId) => (
      <Menu.Item
        onPress={() => {
          closeMenu();
          if (forumRef.current !== forumId) {
            navigation.setParams({ forum: forumId });
            forumRef.current = forumId;
          }
        }}
        title={forums[forumId].name}
        key={`menu-${forumId}`}
        icon={forums[forumId].icon}
      />
    ));
  }, [closeMenu, navigation]);

  return (
    <Appbar.Header statusBarHeight={insets.top}>
      <Appbar.Action
        icon="menu"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        statusBarHeight={insets.top}
        anchor={
          <ThreadAppbarContent title={forums[forum].name} onPress={openMenu} />
        }>
        {forumMenuItems}
      </Menu>
    </Appbar.Header>
  );
}

export default React.memo(ThreadAppBar);
