import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import { getThreadListUrl } from '../api/urls';
import { readBlobHtml } from '../utils/reader';

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

export const fetchThreadList = async (fid) => {
  const resp = await axios({
    method: 'get',
    url: getThreadListUrl(fid),
    // url: getLatestPostUrl(),
    responseType: 'blob',
    withCredentials: true,
    // headers: {
    //   'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36',
    // },
  });
  const data = await readBlobHtml(resp.data);
  return parseThreadList(data);
};
