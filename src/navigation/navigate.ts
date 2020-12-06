import { NavigationProp } from '@react-navigation/native';

const openProfile = (navigation: NavigationProp<any>) => (props = {}) => {
  navigation.navigate('Profile', props);
};

const navigate = (navigation: NavigationProp<any>) => ({
  openProfile: openProfile(navigation),
});

export default navigate;
