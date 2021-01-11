import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cookies } from '@react-native-community/cookies';

const stCookieKey = 'cookie';
export const stGetCookie = () => {
  return getJsonObjectFromStorage(stCookieKey);
};
export const stSaveCookie = (cookie: Cookies) => {
  return AsyncStorage.setItem(stCookieKey, JSON.stringify(cookie));
};
export const stRemoveCookie = () => {
  return AsyncStorage.removeItem(stCookieKey);
};

const getJsonObjectFromStorage = (key: string, params: any = {}) =>
  new Promise(async (resolve) => {
    const { onJsonParseError } = params;

    try {
      const dataJson = await AsyncStorage.getItem(key);

      if (dataJson) {
        const data = JSON.parse(dataJson);
        resolve(data);
      } else {
        resolve(null);
      }
    } catch (e) {
      onJsonParseError && onJsonParseError();
      resolve(null);
    }
  });
