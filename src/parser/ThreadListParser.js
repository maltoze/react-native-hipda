import cheerio from 'cheerio-without-node-native';
import { readBlobHtml } from '../utils/reader';
import { fetchThreadList } from '../api/thread';

// 帖子列表
const parseThreadList = (html) => {
  const $ = cheerio.load(html, { decodeEntities: false });
  let threadList = [];
  let spanID, span;
  $('.threadlist tbody').each(function (i, elem) {
    span = $(this).find('span').first();
    spanID = span.attr('id');
    try {
      if (spanID && spanID.match(/thread_\d+/)) {
        threadList.push({
          name: span.text(),
          tid: span
            .children('a')
            .attr('href')
            .match(/.*tid=\d+/)[0]
            .match(/\d+$/)[0],
          author: {
            name: $(this).find('.author cite').text().trim(),
            uid: $(this).find('.author cite a').attr('href')
              ? $(this)
                  .find('.author cite a')
                  .attr('href')
                  .match(/.*uid=\d+/)[0]
                  .match(/\d+$/)[0]
              : '0',
          },
          date: $(this).find('.author em').text().trim(),
          nums: $(this).find('.nums strong').text().trim(),
          lastpost: {
            author: $(this).find('.lastpost cite').text().trim(),
            date: $(this).find('.lastpost em').text().trim(),
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  });
  return threadList;
};

export const getThreadList = async (fid) => {
  const resp = await fetchThreadList(fid);
  const data = await readBlobHtml(resp.data);
  return parseThreadList(data);
};
