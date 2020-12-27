import { BASE_URL } from './urls';
import { axiosGet } from './axios';
import { readBlobHtml } from '../utils/reader';
import { parseUser } from '../parser/user';

export const getUser = async () => {
  const resp = await axiosGet(BASE_URL);
  if (resp && resp.status === 200) {
    const html = await readBlobHtml(resp.data);
    return parseUser(html);
  }
  throw new Error(resp?.statusText);
};
