import { StackNavigationProp } from '@react-navigation/stack';
import throttle from 'lodash/throttle';

const navigateOneTime = (navigate: any) =>
  throttle(navigate, 1000, { trailing: false });

const openProfile = (navigation: StackNavigationProp<any>) => (props = {}) => {
  navigation.push('Profile', props);
};

const openPostNextPage = (navigation: StackNavigationProp<any>) => (
  props = {},
) => {
  navigation.replace('ThreadDetail', props);
};

const navigate = (navigation: any) => ({
  openProfile: navigateOneTime(openProfile(navigation)),
  openPostNextPage: navigateOneTime(openPostNextPage(navigation)),
});

export default navigate;
