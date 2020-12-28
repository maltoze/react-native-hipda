import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import throttle from 'lodash/throttle';
import { postRouteName, profileRouteName } from './routes';

type NavigationProp = StackNavigationProp<any> | DrawerNavigationProp<any>;

const navigateOneTime = (navigate: any) =>
  throttle(navigate, 1000, { trailing: false });

const openProfile = (navigation: StackNavigationProp<any>) => (props = {}) => {
  navigation.push(profileRouteName, props);
};

const openPostScreen = (navigation: NavigationProp) => (props = {}) => {
  navigation.navigate(postRouteName, props);
};

const navigate = (
  navigation: StackNavigationProp<any> | DrawerNavigationProp<any>,
) => ({
  openProfile: navigateOneTime(
    openProfile(navigation as StackNavigationProp<any>),
  ),
  openPostScreen: navigateOneTime(openPostScreen(navigation)),
});

export default navigate;
