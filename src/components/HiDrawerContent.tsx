import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import CookieManager from '@react-native-community/cookies';
import { Avatar, Drawer } from 'react-native-paper';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { getAvatarUrl } from '../api/urls';
import { useSetLoginModalVisible, useSetUser, useUser } from '../state/store';
import navigate from '../navigation/navigate';
import { stRemoveCookie } from '../utils/storage';

const avatarSize = 60;

export default function HiDrawerContent(
  props: DrawerContentComponentProps<any>,
) {
  const { navigation } = props;
  const navigator = navigate(navigation);
  const user = useUser();
  const setUser = useSetUser();
  const setLoginModalVisible = useSetLoginModalVisible();

  const handleAvatarPress = () => {
    if (user.isGuest) {
      navigation.closeDrawer();
      setLoginModalVisible(true);
    } else {
      navigator.openProfile({ user });
    }
  };

  const handleLogout = () => {
    CookieManager.clearAll();
    stRemoveCookie();
    setUser({ isGuest: true });
  };

  const renderDefaultHeader = () => {
    return (
      <Pressable onPress={handleAvatarPress} style={styles.headerContainer}>
        <Avatar.Icon
          size={avatarSize}
          icon="account"
          style={styles.avatarContainer}
        />
      </Pressable>
    );
  };

  const renderHeader = () => {
    return (
      <Pressable onPress={handleAvatarPress} style={styles.headerContainer}>
        <Avatar.Image
          size={avatarSize}
          source={{
            uri: getAvatarUrl(user.uid!),
          }}
          style={styles.avatarContainer}
        />
        <Text style={styles.headerText}>{user.username}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Drawer.Section>
        {user.isGuest ? renderDefaultHeader() : renderHeader()}
      </Drawer.Section>
      <Drawer.Item icon="logout" label="登出" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  avatarContainer: {
    marginLeft: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerText: {
    marginTop: 8,
    marginLeft: 8,
  },
});
