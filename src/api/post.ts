import qs from 'qs';
import { parsePostList } from '../parser/postListParser';
import {
  PostListUrlArgs,
  PostReplyBody,
  PostReplyUrlParams,
} from '../types/post';
import { urlencode } from '../utils/encode';
import { readBlobHtml } from '../utils/reader';
import { fetchGet, fetchPost } from './fetch';
import { BASE_URL, getPostListUrl } from './urls';

export const getPostList = async (
  urlArgs: PostListUrlArgs,
  abortController?: AbortController | undefined,
) => {
  const url = getPostListUrl(urlArgs);
  const resp = await fetchGet(url, abortController);
  if (resp.ok) {
    const respBlob = await resp.blob();
    const respData = await readBlobHtml(respBlob);
    return parsePostList(respData);
  } else {
    throw new Error(resp.statusText);
  }
};

const getReplyPostUrl = ({ fid, tid }: PostReplyUrlParams) => {
  return (
    `${BASE_URL}/post.php?action=reply&fid=${fid ?? ''}&tid=${tid}` +
    '&replysubmit=yes&infloat=yes&handlekey=fastpost&inajax=1'
  );
};

export const sendReply = async (
  urlParams: PostReplyUrlParams,
  { message, formhash }: PostReplyBody,
) => {
  const url = getReplyPostUrl(urlParams);
  const data = { message: urlencode(message), formhash };
  const resp = await fetchPost(url, qs.stringify(data, { encode: false }));
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
};
