import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import PostScreen from '../screens/PostWebViewScreen';
import ThreadScreen from '../screens/ThreadScreen';
import { defaultForum } from '../forums';
import { RootStackParamList, RouteNames } from '../types/navigation';
import { Appbar } from 'react-native-paper';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={RouteNames.Thread}
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
        name={RouteNames.Thread}
        component={ThreadScreen}
        initialParams={{ forum: defaultForum }}
      />
      <Stack.Screen
        name={RouteNames.Post}
        component={PostScreen}
        options={({ route }) => {
          return {
            title: route.params.title,
            gestureEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
          };
        }}
      />
    </Stack.Navigator>
  );
}
