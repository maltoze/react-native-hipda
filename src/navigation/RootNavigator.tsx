import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Appbar } from 'react-native-paper';
import ProfileScreen from '../screens/ProfileScreen';
import ThreadDetailScreen from '../screens/ThreadDetailScreen';
import HomeScreen from '../screens/HomeDrawerScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        header: ({ navigation, scene, previous }) => {
          const { options } = scene.descriptor;
          return (
            <Appbar.Header>
              {previous ? (
                <Appbar.BackAction onPress={() => navigation.goBack()} />
              ) : (navigation as any).openDrawer ? (
                <Appbar.Action
                  icon="menu"
                  onPress={() =>
                    ((navigation as any) as DrawerNavigationProp<{}>).openDrawer()
                  }
                />
              ) : null}
              <Appbar.Content title={options.title} />
            </Appbar.Header>
          );
        },
      }}>
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
            ...TransitionPresets.SlideFromRightIOS,
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
