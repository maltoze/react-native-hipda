import { CancelToken } from 'axios';
import { axiosGet } from './axios';
import { getThreadDetailUrl, getThreadListUrl } from './urls';

type ThreadReqBaseArgs = {
  page?: number;
  cancelToken: CancelToken;
};

interface ThreadDetailArgs extends ThreadReqBaseArgs {
  tid: number;
}

interface ThreadListArgs extends ThreadReqBaseArgs {
  fid: number;
}

export const fetchThreadDetail = async (args: ThreadDetailArgs) => {
  const { tid, page, cancelToken } = args;
  const url = getThreadDetailUrl(tid, page);
  return await axiosGet(url, cancelToken);
};

export const fetchThreadList = async (args: ThreadListArgs) => {
  const { fid, page, cancelToken } = args;
  const url = getThreadListUrl(fid, page);
  return await axiosGet(url, cancelToken);
};
