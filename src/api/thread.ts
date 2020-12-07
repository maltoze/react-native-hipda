import axios from 'axios';
import { getThreadDetailUrl, getThreadListUrl } from './urls';

export const fetchThreadDetail = async (tid: any, page: number | undefined) => {
  const resp = await axios({
    method: 'get',
    url: getThreadDetailUrl(tid, page),
    withCredentials: true,
    responseType: 'blob',
  });
  return resp;
};

export const fetchThreadList = async (fid: number) => {
  const resp = await axios({
    method: 'get',
    url: getThreadListUrl(fid),
    responseType: 'blob',
    withCredentials: true,
  });
  return resp;
};
