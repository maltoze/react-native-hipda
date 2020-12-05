export const FORUM_SERVER = 'http://www.hi-pda.com';
export const FORUM_SERVER_SSL = 'https://www.hi-pda.com';
export const BASE_URL = FORUM_SERVER_SSL + '/forum/';
export const COOKIE_DOMAIN = 'hi-pda.com';
const AVATAR_BASE = '000000000';

// 登录
export const LOGIN_SUBMIT =
  BASE_URL + 'logging.php?action=login&loginsubmit=yes&inajax=1';

export const getThreadListUrl = (fid) => {
  return BASE_URL + 'forumdisplay.php?fid=' + fid;
};

export const getThreadDetailUrl = (tid, page = 1) => {
  return BASE_URL + 'viewthread.php?tid=' + tid + '&page=' + page;
};

export const getLatestPostUrl = () => {
  return (
    BASE_URL +
    'search.php?searchid=2056&orderby=lastpost&ascdesc=desc&searchsubmit=yes'
  );
};

export const getAvatarUrl = (uid) => {
  let avatarBaseUrl = BASE_URL + 'uc_server/data/avatar/';
  let fullUid = new Array(AVATAR_BASE.length - uid.length + 1).join('0') + uid;
  let str = [
    fullUid.substr(0, 3),
    fullUid.substr(3, 2),
    fullUid.substr(5, 2),
    fullUid.substr(7, 2),
  ].join('/');
  return avatarBaseUrl + str + '_avatar_middle.jpg';
};

export const SMILIES_PATTERN = COOKIE_DOMAIN + '/forum/images/smilies';
export const FORUM_IMG_PATTERN =
  COOKIE_DOMAIN + '/forum/images/(common|default)';
