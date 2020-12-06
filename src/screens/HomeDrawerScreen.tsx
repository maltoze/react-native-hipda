import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HiDrawerContent from '../components/HiDrawerContent';
import forums, { Forum } from '../forums';
import ThreadListScreen from './ThreadListScreen';

const Drawer = createDrawerNavigator();

export default function HomeScreen() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: true }}
      drawerContent={(props) => <HiDrawerContent {...props} />}>
      {(Object.keys(forums) as Forum[]).map((forum) => {
        return (
          <Drawer.Screen
            key={forums[forum].name}
            name={forum}
            initialParams={{ forum }}
            component={ThreadListScreen}
            options={{
              drawerIcon: ({ size, color }) =>
                forums[forum].icon({ size, color }),
              title: forums[forum].name,
            }}
          />
        );
      })}
    </Drawer.Navigator>
  );
}
