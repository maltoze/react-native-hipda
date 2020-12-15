import axios from 'axios';
import { LOGIN_SUBMIT, BASE_URL } from './urls';
import md5 from 'blueimp-md5';
import qs from 'qs';
import cheerio from 'cheerio';
import { readBlobHtml } from '../utils/reader';
import Config from '../Config';

export const requestToLogin = async (username, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = { username, password: md5(password) };
      // 自带cookie
      const resp = await axios({
        url: LOGIN_SUBMIT,
        method: 'POST',
        data: qs.stringify(data),
      });
      if (resp.data.includes('欢迎您回来')) {
        const uid = await getUid();
        // 登录成功
        resolve({ uid });
      } else {
        reject({ status: 'error login' });
      }
      // stSaveCookie(cookie);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

const getUid = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const resp = await axios.get(BASE_URL, { responseType: 'blob' });
      const html = await readBlobHtml(resp.data);
      const $ = cheerio.load(html, { decodeEntities: false });
      const hrefStr = $('#umenu cite a')[0].attribs.href;
      const hrefArr = hrefStr.split('uid=');
      resolve(hrefArr[hrefArr.length - 1]);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });
