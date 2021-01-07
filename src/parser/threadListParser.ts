import { getAvatarUrl } from '../api/urls';
import { ThreadItemProps } from '../types/thread';
import { loadHtml } from './cheerio';

export const parseThreadList = async (html: string) => {
  if (!html) {
    return [];
  }
  const $ = loadHtml(html);
  const promises: Promise<ThreadItemProps>[] = [];
  $('.threadlist tbody').each((_, elem) => {
    try {
      const authorHref = $(elem).find('.author cite a').attr('href');
      // authorHref may not exist
      const uid = parseFloat(authorHref?.match(/.*uid=(\d+)/)![1] || '0');
      const tidHref = $(elem).find('.subject').find('a').attr('href');
      if (!tidHref) {
        throw new Error('Subject link not found');
      }
      const tid = parseFloat(tidHref.match(/.*tid=(\d+)/)![1]);
      const title = $(elem).find('.subject').find('a').first().text();
      const forum = $(elem).find('.forum').text();
      const threadPromise = async () => {
        const avatar = await getAvatarUrl(uid);
        return {
          title,
          tid,
          author: {
            username: $(elem).find('.author cite').text().trim(),
            uid,
            avatar,
          },
          date: $(elem).find('.author em').text().trim(),
          comments: parseFloat($(elem).find('.nums strong').text().trim()),
          views: parseFloat($(elem).find('.nums em').text().trim()),
          forum,
          lastpost: {
            author: $(elem).find('.lastpost cite').text().trim(),
            date: $(elem).find('.lastpost em').text().trim(),
          },
        };
      };
      promises.push(threadPromise());
    } catch (err) {}
  });
  const res = await Promise.all(promises);
  return res;
};
