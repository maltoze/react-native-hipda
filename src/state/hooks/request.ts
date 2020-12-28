import { useEffect, useReducer } from 'react';
import { readBlobHtml } from '../../utils/reader';
import {
  requestFulfilled,
  requestRejected,
  requestSent,
} from '../actions/request';
import { requestInitialState, requestReducer } from '../reducers/request';

type useGetProps = {
  url: string;
  parseFunc: (html: string) => any;
};

export const useGet = (props: useGetProps) => {
  const { url, parseFunc } = props;
  const [state, dispatch] = useReducer(requestReducer, requestInitialState);
  useEffect(() => {
    /* global AbortController */
    const abortController = new AbortController();
    const fetchData = async () => {
      dispatch(requestSent());
      try {
        const resp = await fetch(url, { signal: abortController.signal });
        if (resp.ok) {
          const data = await readBlobHtml(resp.blob());
          dispatch(requestFulfilled(parseFunc(data)));
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          dispatch(requestRejected());
        }
      }
    };
    fetchData();
    return () => abortController.abort();
  }, [parseFunc, url]);
  return state;
};
