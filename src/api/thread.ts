import { CancelToken } from 'axios';
import { parseThreadList } from '../parser/threadListParser';
import { ThreadListUrlArgs } from '../types/thread';
import { readBlobHtml } from '../utils/reader';
import { axiosGet } from './axios';
import { fetchGet } from './fetch';
import { getThreadDetailUrl, getThreadListUrl } from './urls';

type ThreadReqBaseArgs = {
  page?: number;
  cancelToken: CancelToken;
};

export interface ThreadDetailArgs extends ThreadReqBaseArgs {
  tid: number;
}

export const fetchThreadDetail = (args: ThreadDetailArgs) => {
  const { tid, page, cancelToken } = args;
  const url = getThreadDetailUrl(tid, page);
  return axiosGet(url, cancelToken);
};

export const getThreadList = async (
  urlArgs: ThreadListUrlArgs,
  abortController: AbortController | undefined,
) => {
  const url = getThreadListUrl(urlArgs);
  const resp = await fetchGet(url, abortController);
  if (resp.ok) {
    const respBlob = await resp.blob();
    const respData = await readBlobHtml(respBlob);
    return parseThreadList(respData);
  } else {
    throw new Error(resp.statusText);
  }
};
