import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import ThreadListScreen from './screens/ThreadListScreen';
import ThreadDetailScreen from './screens/ThreadDetailScreen';
import Forums from './Forums';
import {stGetUser} from './utils/storage';
import Splash from './screens/Splash';
import HiDrawerContent from './components/Drawer';
import ProfileScreen from './screens/ProfileScreen';

export function AppContainer() {
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      await stGetUser();
      setIsLoading(false);
    };
    bootstrapAsync();
  });

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}>
          {() => (
            <Drawer.Navigator
              screenOptions={{headerShown: true}}
              drawerContent={(props) => <HiDrawerContent {...props} />}>
              <Drawer.Screen
                name={Forums.Discovery.name}
                initialParams={{fid: Forums.Discovery.fid}}
                options={{
                  drawerIcon: () => (
                    <Icon name="cc-discover" type="font-awesome" size={18} />
                  ),
                }}>
                {({navigation, route}) => (
                  <ThreadListScreen navigation={navigation} route={route} />
                )}
              </Drawer.Screen>
              <Drawer.Screen
                name={Forums.Geek.name}
                initialParams={{fid: Forums.Geek.fid}}
                options={{
                  drawerIcon: () => <Icon name="comments" type="foundation" />,
                }}>
                {({navigation, route}) => (
                  <ThreadListScreen navigation={navigation} route={route} />
                )}
              </Drawer.Screen>
              <Drawer.Screen
                name={Forums.Palm.name}
                initialParams={{fid: Forums.Palm.fid}}
                options={{
                  drawerIcon: () => (
                    <Icon name="smartphone" type="materialIcons" />
                  ),
                }}>
                {({navigation, route}) => (
                  <ThreadListScreen navigation={navigation} route={route} />
                )}
              </Drawer.Screen>
            </Drawer.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="ThreadDetail"
          component={ThreadDetailScreen}
          options={({route}) => {
            return {
              gestureEnabled: true,
              title: route.params.subject,
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
    </NavigationContainer>
  );
}
