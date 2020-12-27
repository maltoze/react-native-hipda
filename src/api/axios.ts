import CookieManager, { Cookies } from '@react-native-community/cookies';
import axios, { CancelToken } from 'axios';
import qs from 'qs';
import { stGetCookie } from '../utils/storage';

const userAgent = 'HiPDA-RN';

const getHeader = async () => {
  // Solution for Cookie based authentication issue
  await CookieManager.clearAll();

  const cookies: Cookies = await stGetCookie();
  const headerCookie = cookies
    ? `cdb_auth=${cookies.cdb_auth.value}`
    : undefined;
  return {
    Cookie: headerCookie,
    'User-Agent': userAgent,
  };
};

export const axiosGet = async (
  url: string,
  cancelToken?: CancelToken | undefined,
) => {
  try {
    const headers = await getHeader();
    return await axios({
      method: 'get',
      url: url,
      // withCredentials: true,
      responseType: 'blob',
      cancelToken: cancelToken,
      headers,
    });
  } catch (error) {
    if (!axios.isCancel(error)) {
      throw error;
    }
  }
};

export const axiosPost = async (url: string, data: any) => {
  try {
    const headers = await getHeader();
    return await axios({
      url,
      method: 'POST',
      data: qs.stringify(data),
      headers,
    });
  } catch (error) {
    throw error;
  }
};
