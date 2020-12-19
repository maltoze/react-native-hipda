import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HiDrawerContent from '../components/HiDrawerContent';
import ThreadScreen from './ThreadScreen';
import forums, { Forum } from '../forums';
import HomeBar from '../components/HomeBar';

const Drawer = createDrawerNavigator();
const defaultForum = 'Geek';

export default function HomeScreen() {
  const [forum, setForum] = useState<Forum>(defaultForum);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        header: ({ scene }) => {
          const { options, navigation } = scene.descriptor;
          return (
            <HomeBar
              title={options.title}
              navigation={navigation}
              onSetForum={setForum}
            />
          );
        },
      }}
      drawerContent={(props) => <HiDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        initialParams={{ forum }}
        options={{ title: forums[forum].name }}>
        {(props) => <ThreadScreen {...props} forum={forum} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
