import React, { useCallback, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HiDrawerContent from '../components/HiDrawerContent';
import ThreadScreen from './ThreadScreen';
import forums, { Forum } from '../forums';
import HomeBar from '../components/HomeBar';

const Drawer = createDrawerNavigator();
const defaultForum = 'Geek';

export default function HomeScreen() {
  const [forum, setForum] = useState<Forum>(defaultForum);
  const setForumWithCallback = useCallback((forumId) => setForum(forumId), []);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        header: (props) => {
          return <HomeBar {...props} onSetForum={setForumWithCallback} />;
        },
      }}
      drawerContent={(props) => <HiDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        initialParams={{ forum }}
        options={{ title: forums[forum].name }}>
        {(props) => <ThreadScreen {...props} fid={forums[forum].fid} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
