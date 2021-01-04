import { BASE_URL } from './urls';
import { readBlobHtml } from '../utils/reader';
import { parseUser } from '../parser/user';
import { fetchGet } from './fetch';

export const getUser = async () => {
  const resp = await fetchGet(BASE_URL);
  if (resp && resp.ok) {
    const respBlob = await resp.blob();
    const html = await readBlobHtml(respBlob);
    return parseUser(html);
  }
  throw new Error(resp?.statusText);
};
