import cheerio from 'cheerio-without-node-native';
import { readBlobHtml } from '../utils/reader';
import { fetchThreadDetail } from '../api/thread';

const parseThreadDetail = (html) => {
  if (!html) {
    return { postList: [] };
  }
  const $ = cheerio.load(html);
  let postList = [];
  $('#postlist')
    .children()
    .each(function (_i, _elem) {
      const postAttachListHtml = $(this).find('.postattachlist').html();
      const tMsgFontHtml = $(this).find('.t_msgfont').html();
      postList.push({
        postno: $(this).find('.postinfo strong a em').text(),
        author: {
          name: $(this).find('.postauthor .postinfo a').text(),
          uid: $(this)
            .find('.postauthor .postinfo a')
            .attr('href')
            .match(/.*uid=\d+/)[0]
            .match(/\d+$/)[0],
        },
        // content: cheerio.html($(this).find(".postmessage"), {
        //   decodeEntities: false,
        //   normalizeWhitespace: true,
        // }),
        content: postAttachListHtml
          ? tMsgFontHtml + postAttachListHtml
          : tMsgFontHtml,
        posttime: $(this).find('.authorinfo em').text().slice(4),
      });
    });
  let totalPages = 1;
  if ($('.pages')[0]) {
    // totalPages = $('.pages')[0]
    totalPages = $('.pages')[0].children.length - 1;
  }
  const postObj = { postList: postList, totalPages: totalPages };
  return postObj;
};

export const getThreadDetail = async (args) => {
  const resp = await fetchThreadDetail({ ...args });
  const data = resp && (await readBlobHtml(resp.data));
  return parseThreadDetail(data);
};
