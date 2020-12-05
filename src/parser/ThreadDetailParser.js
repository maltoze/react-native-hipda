import { getThreadDetailUrl } from '../api/urls';
import cheerio from 'cheerio-without-node-native';
import axios from 'axios';
import { readBlobHtml } from '../utils/reader';

const parseThreadDetail = (html) => {
  const $ = cheerio.load(html);
  let postList = [];
  $('#postlist')
    .children()
    .each(function (_i, _elem) {
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
        //   decodeEntities: false,gT
        //   normalizeWhitespacea: true,
        // }),
        content: $(this).find('.t_msgfont').html(),
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
  // return postList;
};

export const fetchThreadDetail = async (tid, page = 1) => {
  const resp = await axios({
    method: 'get',
    url: getThreadDetailUrl(tid, page),
    // 带上cookie
    withCredentials: true,
    // 中文乱码处理
    responseType: 'blob',
  });

  const data = await readBlobHtml(resp.data);
  return parseThreadDetail(data);
};
