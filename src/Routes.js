import React from 'react';
// Drawer(react-navigation v3) sluggish on Android
import {createDrawerNavigator} from 'react-navigation-drawer';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import ThreadListScreen from './screens/ThreadListScreen';
import ThreadDetailScreen from './screens/ThreadDetailScreen';
import Theme from './Theme';
import Forums from './Forums';
import Drawer from './components/Drawer';
import Splash from './screens/Splash';
import {Icon} from 'react-native-elements';
import Profile from './screens/Profile';

const ThreadStack = createStackNavigator(
  {
    ThreadList: {
      screen: ThreadListScreen,
      params: {},
    },
    ThreadDetail: {
      screen: ThreadDetailScreen,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Theme.colors.primary,
      },
      headerTintColor: '#fff',
    },
    headerMode: 'float',
  },
);

const AppDrawer = createDrawerNavigator(
  {
    [Forums.Discovery.name]: {
      screen: ThreadStack,
      params: {fid: Forums.Discovery.fid},
      navigationOptions: ({navigation}) => ({
        drawerIcon: <Icon name="cc-discover" type="font-awesome" size={18} />,
      }),
      path: 'forum/discovery',
    },
    [Forums.Geek.name]: {
      screen: ThreadStack,
      params: {fid: Forums.Geek.fid},
      navigationOptions: ({navigation}) => ({
        drawerIcon: <Icon name="comments" type="foundation" />,
      }),
      path: 'forum/geek',
    },
    [Forums.Palm.name]: {
      screen: ThreadStack,
      params: {fid: Forums.Palm.fid},
      navigationOptions: ({navigation}) => ({
        drawerIcon: <Icon name="smartphone" type="materialIcons" />,
      }),
    },
    [Forums.Robots.name]: {
      screen: ThreadStack,
      params: {fid: Forums.Robots.fid},
      navigationOptions: ({navigation}) => ({
        drawerIcon: <Icon name="robot" type="material-community" />,
      }),
    },
  },
  {
    contentOptions: {},
    contentComponent: Drawer,
  },
);

export const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Splash: {screen: Splash},
      App: {screen: AppDrawer},
    },
    // { mode: "modal", headerMode: "none" }
  ),
);
