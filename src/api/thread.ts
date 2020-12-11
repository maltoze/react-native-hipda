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

export const fetchThreadDetail = (args: ThreadDetailArgs) => {
  const { tid, page, cancelToken } = args;
  const url = getThreadDetailUrl(tid, page);
  return axiosGet(url, cancelToken);
};

export const fetchThreadList = (args: ThreadListArgs) => {
  const { fid, page, cancelToken } = args;
  const url = getThreadListUrl(fid, page);
  return axiosGet(url, cancelToken);
};
