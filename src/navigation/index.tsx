import React, { useEffect, useState } from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  Route,
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getUser } from '../api/user';
import { useSetUser } from '../store/user';
import { notifyMessage } from '../utils/notify';
import useMounted from '../hooks/useMounted';
import RootNavigator from './RootNavigator';
import HiDrawerContent from '../components/HiDrawerContent';
import { RouteNames } from '../types/navigation';

const Drawer = createDrawerNavigator();

const getGestureEnabled = (route: Route<any>) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? RouteNames.Thread;
  switch (routeName) {
    case RouteNames.Thread:
      return true;
    default:
      return false;
  }
};

export default function Navigation() {
  const [loading, setLoading] = useState(true);
  const setUser = useSetUser();
  const isMounted = useMounted();

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        notifyMessage(error.message);
      }
      isMounted() && setLoading(false);
    };
    bootstrapAsync();
  }, [isMounted, setUser]);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <HiDrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={RootNavigator}
          options={({ route }) => {
            return {
              gestureEnabled: getGestureEnabled(route),
            };
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
