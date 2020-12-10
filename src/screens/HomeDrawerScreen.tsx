import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { Appbar } from 'react-native-paper';
import HiDrawerContent from '../components/HiDrawerContent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ForumScreen from './ForumScreen';

const Drawer = createDrawerNavigator();
const defaultForum = 'Geek';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        header: ({ scene }) => {
          const { options, navigation } = scene.descriptor;
          return (
            <Appbar.Header statusBarHeight={insets.top}>
              <Appbar.Action
                icon="menu"
                onPress={() =>
                  ((navigation as any) as DrawerNavigationProp<{}>).openDrawer()
                }
              />
              <Appbar.Content title={options.title} />
            </Appbar.Header>
          );
        },
      }}
      drawerContent={(props) => <HiDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={ForumScreen}
        initialParams={{ forum: defaultForum }}
        options={{ title: 'Home' }}
      />
    </Drawer.Navigator>
  );
}
