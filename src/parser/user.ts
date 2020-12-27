import { getAvatarUrl } from '../api/urls';
import { User } from '../types';
import { loadHtml } from './cheerio';

export const parseUser = async (html: string) => {
  const user: User = {};
  const $ = loadHtml(html);
  const userLinkElem = $('#umenu cite a');
  if (userLinkElem.length === 0) {
    user.isGuest = true;
  } else {
    const uidMatch = userLinkElem.attr().href.match(/uid=(\d+)/);
    if (uidMatch) {
      user.uid = parseFloat(uidMatch[1]);
      user.avatar = await getAvatarUrl(user.uid);
    }
    const username = userLinkElem.text();
    user.username = username;
    user.isGuest = false;
  }
  return user;
};
