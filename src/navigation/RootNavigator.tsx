import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Appbar } from 'react-native-paper';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeDrawerScreen';
import PostScreen from '../screens/PostScreen';
import {
  homeNavigatorRouteName,
  postRouteName,
  profileRouteName,
} from './routes';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        header: ({ navigation, scene, previous, insets }) => {
          const { options } = scene.descriptor;
          return (
            <Appbar.Header statusBarHeight={insets.top}>
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
        name={homeNavigatorRouteName}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={postRouteName}
        component={PostScreen}
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
        name={profileRouteName}
        component={ProfileScreen}
        options={{
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
}
