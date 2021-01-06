import { parseThreadList } from '../parser/threadListParser';
import { ThreadListUrlArgs } from '../types/thread';
import { readBlobHtml } from '../utils/reader';
import { fetchGet } from './fetch';
import { getThreadListUrl } from './urls';

export const getThreadList = async (
  urlArgs: ThreadListUrlArgs,
  abortController: AbortController | undefined,
) => {
  const url = await getThreadListUrl(urlArgs);
  const resp = await fetchGet(url, abortController);
  if (resp.ok) {
    const respBlob = await resp.blob();
    const respData = await readBlobHtml(respBlob);
    return parseThreadList(respData);
  } else {
    throw new Error(resp.statusText);
  }
};
