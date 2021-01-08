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
  abortController?: AbortController,
) => {
  try {
    return await fetch(url, {
      signal: abortController?.signal,
      headers: await getHeaders(),
    });
  } catch (error) {
    throw error;
  }
};

export const fetchPost = async (
  url: string,
  body: BodyInit_,
  headers: HeadersInit_,
  abortController?: AbortController,
) => {
  const defaultHeaders = await getHeaders();
  try {
    return await fetch(url, {
      method: 'POST',
      body,
      headers: { ...defaultHeaders, ...headers },
      signal: abortController?.signal,
    });
  } catch (error) {
    throw error;
  }
};
