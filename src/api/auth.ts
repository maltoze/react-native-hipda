import md5 from 'blueimp-md5';
import cheerio from 'cheerio';
import { readBlobHtml } from '../utils/reader';
import { axiosGet, axiosPost } from './axios';
import { LOGIN_SUBMIT, BASE_URL, FORUM_SERVER_SSL } from './urls';
import CookieManager from '@react-native-community/cookies';
import { stSaveCookie } from '../utils/storage';

export const requestToLogin = async (username: string, password: string) => {
  const data = { username, password: md5(password) };
  const resp = await axiosPost(LOGIN_SUBMIT, data);
  if (resp && resp.data.includes('欢迎您回来')) {
    const cookies = await CookieManager.get(FORUM_SERVER_SSL);
    await stSaveCookie(cookies);
    const uid = await getUid();
    return { uid: parseFloat(uid) };
  } else {
    return { uid: null };
  }
};

const getUid = async () => {
  const resp = await axiosGet(BASE_URL);
  const html = await readBlobHtml(resp!.data);
  const $ = cheerio.load(html, { decodeEntities: false });
  const hrefStr = $('#umenu cite a')[0].attribs.href;
  const hrefArr = hrefStr.split('uid=');
  return hrefArr[hrefArr.length - 1];
};
