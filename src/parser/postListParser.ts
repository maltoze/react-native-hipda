import { PostItemBaseProps } from '../types/post';
import { getAvatarUrl } from '../api/urls';
import { loadHtml } from './cheerio';

function handleContent(content: string) {
  return content;
}

export const parsePostList = async (html: string) => {
  if (!html) {
    return { postList: [] };
  }
  const $ = loadHtml(html);
  const promises: Promise<PostItemBaseProps>[] = [];
  $('#postlist')
    .children()
    .each(function (_, elem) {
      try {
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
        const posttime = $(elem).find('.authorinfo em').text().slice(4);

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
            posttime,
          };
        };
        promises.push(postPromise());
      } catch (error) {
        console.log(error);
      }
    });
  const hasNext = $('.pages .next').length > 0 ? true : false;
  const formhash = $('input[name=formhash]').val();
  const postList = await Promise.all(promises);
  return { postList, hasNext, formhash };
};
