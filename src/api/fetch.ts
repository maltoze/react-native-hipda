import CookieManager, { Cookies } from '@react-native-community/cookies';
import { stGetCookie } from '../utils/storage';

const userAgent = 'HiPDA-RN';

const getHeaders = async () => {
  // Solution for Cookie based authentication issue
  await CookieManager.clearAll();

  const cookies: Cookies = await stGetCookie();
  const headerCookie = cookies ? `cdb_auth=${cookies.cdb_auth.value}` : '';
  return {
    Cookie: headerCookie,
    'User-Agent': userAgent,
  };
};

export const fetchGet = async (
  url: string,
  abortController: AbortController | undefined,
) => {
  return fetch(url, {
    signal: abortController?.signal,
    headers: await getHeaders(),
  });
};