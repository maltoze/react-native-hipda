import { parsePostList } from '../parser/postListParser';
import { PostListUrlArgs } from '../types/post';
import { readBlobHtml } from '../utils/reader';
import { fetchGet } from './fetch';
import { getPostListUrl } from './urls';

export const getPostList = async (
  urlArgs: PostListUrlArgs,
  abortController: AbortController | undefined,
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
