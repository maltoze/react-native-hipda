import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Avatar } from 'react-native-paper';
import {
  DrawerItemList,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Theme from '../Theme';
import { getAvatarUrl } from '../api/urls';
import Divider from './HiDivider';
import { useSetLoginModalVisible, useUser } from '../state/store';
import navigate from '../navigation/navigate';

export default function HiDrawerContent(
  props: DrawerContentComponentProps<any>,
) {
  const { navigation } = props;
  const navigator = navigate(navigation);
  const user = useUser();
  const setLoginModalVisible = useSetLoginModalVisible();

  const handleAvatarPress = () => {
    if (user.isGuest) {
      navigation.closeDrawer();
      setLoginModalVisible(true);
    } else {
      navigator.openProfile();
    }
  };

  const renderDefaultHeader = () => {
    return (
      <Pressable onPress={handleAvatarPress} style={styles.headerContainer}>
        <Avatar.Icon
          size={Theme.specifications.largeIconSize}
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
          size={Theme.specifications.largeIconSize}
          source={{
            uri: getAvatarUrl(user.uid),
          }}
          style={styles.avatarContainer}
        />
        <Text style={styles.headerText}>{user.username}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {user.isGuest ? renderDefaultHeader() : renderHeader()}
      <Divider />
      <DrawerContentScrollView>
        <DrawerItemList {...props} labelStyle={styles.drawerLabel} />
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    marginLeft: Theme.spacing.small,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.small,
  },
  headerText: {
    ...Theme.typography.body,
    marginTop: Theme.spacing.tiny,
    marginLeft: Theme.spacing.tiny,
  },
  drawerLabel: {
    fontWeight: 'bold',
  },
});