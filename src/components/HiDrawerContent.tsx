import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import CookieManager from '@react-native-community/cookies';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Avatar,
  Drawer,
  useTheme,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSetLoginModalVisible, useSetUser, useUser } from '../store/user';
import { useColorScheme, useSetColorScheme } from '../store/preferences';
import { stRemoveCookie } from '../utils/storage';
import HiAvatar from './HiAvatar';

const avatarSize = 60;

const HiDrawerContent = (props: DrawerContentComponentProps) => {
  const { navigation } = props;
  const user = useUser();
  const setUser = useSetUser();
  const setLoginModalVisible = useSetLoginModalVisible();

  const { colors } = useTheme();
  const setColorScheme = useSetColorScheme();
  const colorScheme = useColorScheme();

  const insets = useSafeAreaInsets();

  const toggleTheme = () => {
    navigation.closeDrawer();
    setTimeout(
      () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark'),
      10,
    );
  };

  const handleAvatarPress = () => {
    if (user.isGuest) {
      navigation.closeDrawer();
      setLoginModalVisible(true);
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
      <View
        style={{ backgroundColor: colors.background, paddingTop: insets.top }}>
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
        <View style={styles.darkMode}>
          <Drawer.Item icon="brightness-6" label="深色模式" />
          <View pointerEvents="none">
            <Switch value={colorScheme === 'dark'} />
          </View>
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
    paddingVertical: 24,
  },
  headerText: {
    marginTop: 8,
    marginLeft: 8,
  },
  darkMode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
});

export default React.memo(HiDrawerContent);
