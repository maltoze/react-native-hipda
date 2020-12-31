import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator';
import { getUser } from '../api/user';
import { useSetUser } from '../state/store';
import SplashScreen from '../screens/SplashScreen';
import { notifyMessage } from '../utils/notify';
import useMounted from '../hooks/useMounted';

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
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
