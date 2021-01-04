import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HiDrawerContent from '../components/HiDrawerContent';
import ThreadScreen from './ThreadScreen';
import HomeBar from '../components/HomeBar';
import { ThreadProvider } from '../provider/ThreadProvider';
import { threadRouteName } from '../navigation/routes';

const Drawer = createDrawerNavigator();

export default function HomeScreen() {
  return (
    <ThreadProvider>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          header: ({ scene }) => {
            const { options, navigation } = scene.descriptor;
            return <HomeBar title={options.title} navigation={navigation} />;
          },
        }}
        drawerContent={(props) => <HiDrawerContent {...props} />}>
        <Drawer.Screen name={threadRouteName}>
          {(props) => <ThreadScreen {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </ThreadProvider>
  );
}
