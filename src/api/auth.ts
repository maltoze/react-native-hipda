import md5 from 'blueimp-md5';
import qs from 'qs';
import { LOGIN_SUBMIT, FORUM_SERVER_SSL } from './urls';
import CookieManager from '@react-native-community/cookies';
import { stSaveCookie } from '../utils/storage';
import { getUser } from './user';
import { loadXml } from '../parser/cheerio';
import { fetchPost } from './fetch';
import { urlencode } from '../utils/encode';
import { readBlobHtml } from '../utils/reader';

export const requestToLogin = async (username: string, password: string) => {
  const data = { username: urlencode(username), password: md5(password) };
  const resp = await fetchPost(
    LOGIN_SUBMIT,
    qs.stringify(data, { encode: false }),
    { 'Content-Type': 'application/x-www-form-urlencoded' },
  );
  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }
  const respBlob = await resp.blob();
  const respData = await readBlobHtml(respBlob);
  if (respData.includes('欢迎您回来')) {
    const cookies = await CookieManager.get(FORUM_SERVER_SSL);
    await stSaveCookie(cookies);
    const user = getUser();
    return user;
  } else {
    const $ = loadXml(respData);
    const msg = $('root').text();
    throw new Error(msg);
  }
};
