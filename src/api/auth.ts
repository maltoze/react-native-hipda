import md5 from 'blueimp-md5';
import { axiosPost } from './axios';
import { LOGIN_SUBMIT, FORUM_SERVER_SSL } from './urls';
import CookieManager from '@react-native-community/cookies';
import { stSaveCookie } from '../utils/storage';
import { getUser } from './user';
import { loadXml } from '../parser/cheerio';

export const requestToLogin = async (username: string, password: string) => {
  const data = { username, password: md5(password) };
  const resp = await axiosPost(LOGIN_SUBMIT, data);
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  if (resp.data.includes('欢迎您回来')) {
    const cookies = await CookieManager.get(FORUM_SERVER_SSL);
    await stSaveCookie(cookies);
    const user = getUser();
    return user;
  } else {
    const $ = loadXml(resp.data);
    const msg = $('root').text();
    throw new Error(msg);
  }
};
