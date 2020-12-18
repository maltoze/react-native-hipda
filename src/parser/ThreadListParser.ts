import cheerio from 'cheerio';
import { readBlobHtml } from '../utils/reader';
import { fetchThreadList, ThreadListArgs } from '../api/thread';
import { ThreadItemProps } from '../types';

// 帖子列表
const parseThreadList = (html: string) => {
  if (!html) {
    return [];
  }
  const $ = cheerio.load(html, {
    decodeEntities: false,
    _useHtmlParser2: true,
  });
  const threadList: ThreadItemProps[] = [];
  let spanID, span;
  $('.threadlist tbody').each(function (_, elem) {
    span = $(elem).find('span').first();
    spanID = span.attr('id');
    const authorHref = $(elem).find('.author cite a').attr('href');
    try {
      if (spanID && spanID.match(/thread_\d+/)) {
        threadList.push({
          title: span.text(),
          tid: parseFloat(
            span!
              .children('a')!
              .attr('href')!
              .match(/.*tid=(\d+)/)![1],
          ),
          author: {
            username: $(elem).find('.author cite').text().trim(),
            uid: parseFloat(authorHref!.match(/.*uid=(\d+)/)![1]),
          },
          date: $(elem).find('.author em').text().trim(),
          comments: parseFloat($(elem).find('.nums strong').text().trim()),
          lastpost: {
            author: $(elem).find('.lastpost cite').text().trim(),
            date: $(elem).find('.lastpost em').text().trim(),
          },
        });
      }
    } catch (err) {
      console.error(err, spanID);
    }
  });
  return threadList;
};

export const getThreadList = async (args: ThreadListArgs) => {
  const resp = await fetchThreadList({ ...args });
  const data = resp && (await readBlobHtml(resp.data));
  return parseThreadList(data);
};
