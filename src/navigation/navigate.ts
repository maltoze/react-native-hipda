import { StackNavigationProp } from '@react-navigation/stack';

const openProfile = (navigation: StackNavigationProp<any>) => (props = {}) => {
  navigation.push('Profile', props);
};

const navigate = (navigation: any) => ({
  openProfile: openProfile(navigation),
});

export default navigate;
