import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import HiDrawerContent from '../components/HiDrawerContent';
import ThreadListScreen from './ThreadListScreen';
import { Appbar } from 'react-native-paper';

const Drawer = createDrawerNavigator();
const defaultForum = 'Geek';

export default function HomeScreen() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        header: ({ scene }) => {
          const { options, navigation } = scene.descriptor;
          return (
            <Appbar.Header>
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
        component={ThreadListScreen}
        initialParams={{ forum: defaultForum }}
        options={{ title: 'Home' }}
      />
    </Drawer.Navigator>
  );
}
