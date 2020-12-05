import { Platform } from 'react-native';

export default {
  isAndroid: Platform.OS === 'android',
  logNetworkErrors: true,
  logGeneral: true,
};
