import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import CookieManager from '@react-native-community/cookies';
import {
  Avatar,
  Drawer,
  useTheme,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import {
  useColorScheme,
  useSetColorScheme,
  useSetLoginModalVisible,
  useSetUser,
  useUser,
} from '../state/store';
import navigate from '../navigation/navigate';
import { stRemoveCookie } from '../utils/storage';
import HiAvatar from './HiAvatar';

const avatarSize = 60;

const HiDrawerContent = (props: DrawerContentComponentProps<any>) => {
  const { navigation } = props;
  const navigator = navigate(navigation);
  const user = useUser();
  const setUser = useSetUser();
  const setLoginModalVisible = useSetLoginModalVisible();

  const { colors } = useTheme();
  const setColorScheme = useSetColorScheme();
  const colorScheme = useColorScheme();

  const toggleTheme = () => {
    navigation.closeDrawer();
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  const handleAvatarPress = () => {
    if (user.isGuest) {
      navigation.closeDrawer();
      setLoginModalVisible(true);
    } else {
      navigator.openProfile({ user });
    }
  };

  const handleLogout = () => {
    navigation.closeDrawer();
    CookieManager.clearAll();
    stRemoveCookie();
    setUser({ isGuest: true });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={{ backgroundColor: colors.background }}>
        <Pressable onPress={handleAvatarPress} style={styles.accountContainer}>
          {user.isGuest ? (
            <Avatar.Icon
              size={avatarSize}
              icon="account"
              style={styles.avatarContainer}
            />
          ) : (
            <>
              <HiAvatar
                user={user}
                style={styles.avatarContainer}
                size={avatarSize}
              />
              <Text style={styles.headerText}>{user.username}</Text>
            </>
          )}
        </Pressable>
      </View>
      <TouchableRipple onPress={toggleTheme}>
        <View style={styles.preference}>
          <Drawer.Item icon="brightness-6" label="深色模式" />
          <Switch value={colorScheme === 'dark'} onValueChange={toggleTheme} />
        </View>
      </TouchableRipple>
      {!user.isGuest && (
        <Drawer.Item icon="logout" label="登出" onPress={handleLogout} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    marginLeft: 16,
  },
  headerContainer: {},
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 18,
  },
  headerText: {
    marginTop: 8,
    marginLeft: 8,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
});

export default React.memo(HiDrawerContent);
