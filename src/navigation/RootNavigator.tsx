import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeDrawerScreen';
import PostScreen from '../screens/PostScreen';
import {
  homeNavigatorRouteName,
  postRouteName,
  profileRouteName,
} from './routes';
import PostAppbar from '../components/Post/PostAppbar';
import { PostProvider } from '../provider/PostProvider';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <PostProvider>
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
          options={({ route }) => {
            const { subject, tid } = route.params as any;
            return {
              gestureEnabled: true,
              title: subject,
              ...TransitionPresets.SlideFromRightIOS,
              header: (props) => <PostAppbar {...props} tid={tid} />,
            };
          }}>
          {(props) => <PostScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name={profileRouteName}
          component={ProfileScreen}
          options={{
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </PostProvider>
  );
}
