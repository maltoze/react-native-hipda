import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HiDrawerContent from '../components/HiDrawerContent';
import forums, { ForumId } from '../forums';
import ThreadListScreen from './ThreadListScreen';

const Drawer = createDrawerNavigator();

export default function HomeScreen() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: true }}
      drawerContent={(props) => <HiDrawerContent {...props} />}>
      {(Object.keys(forums) as ForumId[]).map((forumId) => {
        return (
          <Drawer.Screen
            key={forums[forumId].name}
            name={forumId}
            initialParams={{ fid: forums[forumId].fid }}
            component={ThreadListScreen}
            options={{
              drawerIcon: ({ size, color }) =>
                forums[forumId].icon({ size, color }),
              title: forums[forumId].name,
            }}
          />
        );
      })}
    </Drawer.Navigator>
  );
}
