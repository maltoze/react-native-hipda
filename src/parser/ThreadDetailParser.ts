import cheerio from 'cheerio';
import { readBlobHtml } from '../utils/reader';
import { fetchThreadDetail, ThreadDetailArgs } from '../api/thread';
import { PostItemBaseProps } from '../types';

function handleContent(content: string) {
  return content.replace(/\n/g, '');
}

const parseThreadDetail = (html: string) => {
  if (!html) {
    return { postList: [] };
  }
  const $ = cheerio.load(html, {
    decodeEntities: false,
    _useHtmlParser2: true,
  });
  const postList: PostItemBaseProps[] = [];
  $('#postlist')
    .children()
    .each(function (_, elem) {
      const authorElem = $(elem).find('.postauthor .postinfo a');
      const uidMatch = $(authorElem)!
        .attr('href')!
        .match(/.*?uid=(\d+)/)!;

      const postAttachListHtml = $(elem).find('.postattachlist').html();
      let tMsgFontHtml = $(elem).find('.t_msgfont').html();
      const content = postAttachListHtml
        ? tMsgFontHtml + postAttachListHtml
        : tMsgFontHtml;
      const postno = $(elem).find('.postinfo strong a em').text();

      postList.push({
        postno: parseFloat(postno),
        author: {
          username: $(authorElem).text(),
          uid: parseFloat(uidMatch[1]),
        },
        content: content && handleContent(content),
        posttime: $(elem).find('.authorinfo em').text().slice(4),
      });
    });
  let totalPages = 1;
  if ($('.pages')[0]) {
    totalPages = $('.pages')[0].children.length - 1;
  }
  return { postList, totalPages: totalPages };
};

export const getThreadDetail = async (args: ThreadDetailArgs) => {
  const resp = await fetchThreadDetail({ ...args });
  const data = resp && (await readBlobHtml(resp.data));
  return parseThreadDetail(data);
};
