import cheerio from 'cheerio';
import { readBlobHtml } from '../utils/reader';
import { fetchThreadList, ThreadListArgs } from '../api/thread';
import { ThreadItemProps } from '../types';
import { getAvatarUrl } from '../api/urls';

// 帖子列表
const parseThreadList = async (html: string) => {
  if (!html) {
    return [];
  }
  const $ = cheerio.load(html, {
    decodeEntities: false,
    _useHtmlParser2: true,
  });
  const promises: Promise<ThreadItemProps>[] = [];
  $('.threadlist tbody').each((_, elem) => {
    const span = $(elem).find('span').first();
    const spanID = span.attr('id');
    try {
      if (spanID?.match(/thread_\d+/)) {
        const authorHref = $(elem).find('.author cite a').attr('href');
        // authorHref may not exist
        const uid = parseFloat(authorHref?.match(/.*uid=(\d+)/)![1] || '0');
        const threadPromise = async () => {
          const avatar = await getAvatarUrl(uid);
          return {
            title: span.text(),
            tid: parseFloat(
              span!
                .children('a')!
                .attr('href')!
                .match(/.*tid=(\d+)/)![1],
            ),
            author: {
              username: $(elem).find('.author cite').text().trim(),
              uid,
              avatar,
            },
            date: $(elem).find('.author em').text().trim(),
            comments: parseFloat($(elem).find('.nums strong').text().trim()),
            lastpost: {
              author: $(elem).find('.lastpost cite').text().trim(),
              date: $(elem).find('.lastpost em').text().trim(),
            },
          };
        };
        promises.push(threadPromise());
      }
    } catch (err) {
      console.warn(err, spanID);
    }
  });
  const res = await Promise.all(promises);
  return res;
};

export const getThreadList = async (args: ThreadListArgs) => {
  const resp = await fetchThreadList({ ...args });
  const data = resp && (await readBlobHtml(resp.data));
  return parseThreadList(data);
};
