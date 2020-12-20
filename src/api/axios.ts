import CookieManager, { Cookies } from '@react-native-community/cookies';
import axios, { CancelToken } from 'axios';
import qs from 'qs';
import { stGetCookie } from '../utils/storage';

const userAgent = 'HiPDA-RN';

export const axiosGet = async (
  url: string,
  cancelToken?: CancelToken | undefined,
) => {
  try {
    // Solution for Cookie based authentication issue
    await CookieManager.clearAll();

    const cookies: Cookies = await stGetCookie();
    const headerCookie = cookies
      ? `cdb_auth=${cookies.cdb_auth.value}`
      : undefined;
    const resp = await axios({
      method: 'get',
      url: url,
      // withCredentials: true,
      responseType: 'blob',
      cancelToken: cancelToken,
      headers: {
        Cookie: headerCookie,
        'User-Agent': userAgent,
      },
    });
    return resp;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log(error);
    } else {
      console.warn(error);
    }
  }
};

export const axiosPost = async (url: string, data: any) => {
  try {
    return await axios({
      url,
      method: 'POST',
      data: qs.stringify(data),
      headers: {
        'User-Agent': userAgent,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
