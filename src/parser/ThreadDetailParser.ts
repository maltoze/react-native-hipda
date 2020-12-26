import cheerio from 'cheerio';
import { readBlobHtml } from '../utils/reader';
import { fetchThreadDetail, ThreadDetailArgs } from '../api/thread';
import { PostItemBaseProps } from '../types';
import { getAvatarUrl } from '../api/urls';

function handleContent(content: string) {
  return content;
}

const parseThreadDetail = async (html: string) => {
  if (!html) {
    return { postList: [] };
  }
  const $ = cheerio.load(html, {
    decodeEntities: false,
    _useHtmlParser2: true,
  });
  const promises: Promise<PostItemBaseProps>[] = [];
  $('#postlist')
    .children()
    .each(function (_, elem) {
      const authorElem = $(elem).find('.postauthor .postinfo a');
      const uidMatch = $(authorElem)!
        .attr('href')!
        .match(/.*?uid=(\d+)/)!;
      const postAttachListHtml = $(elem).find('.postattachlist').html();
      let tMsgFontHtml = $(elem).find('.t_msgfont').html();
      const lockedElem = $(elem).find('.locked');
      let content: string | null;
      if (lockedElem.length > 0) {
        content = $.html(lockedElem);
      } else {
        content = postAttachListHtml
          ? tMsgFontHtml + postAttachListHtml
          : tMsgFontHtml;
      }
      const postno = $(elem).find('.postinfo strong a em').text();
      const uid = parseFloat(uidMatch[1]);

      const postPromise = async () => {
        const avatar = await getAvatarUrl(uid);
        return {
          postno: parseFloat(postno),
          author: {
            username: $(authorElem).text(),
            uid,
            avatar,
          },
          content: content && handleContent(content),
          posttime: $(elem).find('.authorinfo em').text().slice(4),
        };
      };
      promises.push(postPromise());
    });
  const hasNext = $('.pages .next').length > 0 ? true : false;
  const postList = await Promise.all(promises);
  return { postList, hasNext };
};

export const getThreadDetail = async (args: ThreadDetailArgs) => {
  const resp = await fetchThreadDetail({ ...args });
  const data = resp && (await readBlobHtml(resp.data));
  return parseThreadDetail(data);
};
