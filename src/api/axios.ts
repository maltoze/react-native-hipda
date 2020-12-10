import axios, { CancelToken } from 'axios';

export const axiosGet = async (url: string, cancelToken: CancelToken) => {
  return await axios({
    method: 'get',
    url: url,
    withCredentials: true,
    responseType: 'blob',
    cancelToken: cancelToken,
  }).catch((error) => {
    if (axios.isCancel(error)) {
      console.log(error);
    } else {
      console.warn(error);
    }
  });
};
