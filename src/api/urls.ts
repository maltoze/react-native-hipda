import axios from 'axios';
import { ThreadListUrlArgs } from '../types/thread';

export const FORUM_SERVER = 'http://www.hi-pda.com';
export const FORUM_SERVER_SSL = 'https://www.hi-pda.com';
export const BASE_URL = FORUM_SERVER_SSL + '/forum/';
export const COOKIE_DOMAIN = 'hi-pda.com';
const AVATAR_BASE = '000000000';

// 登录
export const LOGIN_SUBMIT =
  BASE_URL + 'logging.php?action=login&loginsubmit=yes&inajax=1';

export const getThreadListUrl = ({
  fid,
  page = 1,
  orderby,
  filter,
}: ThreadListUrlArgs) => {
  return (
    `${BASE_URL}forumdisplay.php?fid=${fid}&page=${page}` +
    `&filter=${filter || ''}&orderby=${orderby || ''}`
  );
};

export const getThreadDetailUrl = (tid: number, page = 1) => {
  return BASE_URL + 'viewthread.php?tid=' + tid + '&page=' + page;
};

export const getLatestThreadUrl = () => {
  // 24小时内的帖子
  return `${BASE_URL}search.php?srchfrom=86400&searchsubmit=yes`;
};

export const getAvatarUrl = async (uid: number) => {
  const avatarBaseUrl = BASE_URL + 'uc_server/data/avatar/';
  const fullUid =
    new Array(AVATAR_BASE.length - uid.toString().length + 1).join('0') + uid;
  const str = [
    fullUid.substr(0, 3),
    fullUid.substr(3, 2),
    fullUid.substr(5, 2),
    fullUid.substr(7, 2),
  ].join('/');
  const avatarUrl = avatarBaseUrl + str + '_avatar_middle.jpg';
  try {
    await axios.head(avatarUrl, { responseType: 'blob' });
    return avatarUrl;
  } catch (error) {
    return '';
  }
};

export const SMILIES_PATTERN = COOKIE_DOMAIN + '/forum/images/smilies';
export const FORUM_IMG_PATTERN =
  COOKIE_DOMAIN + '/forum/images/(common|default)';
