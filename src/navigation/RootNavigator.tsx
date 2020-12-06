import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ThreadDetailScreen from '../screens/ThreadDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeDrawerScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ThreadDetail"
        component={ThreadDetailScreen}
        options={({ route }) => {
          const { subject } = route.params as any;
          return {
            gestureEnabled: true,
            title: subject,
          };
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
}
