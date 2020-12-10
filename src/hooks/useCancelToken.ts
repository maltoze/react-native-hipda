import { useEffect, useMemo } from 'react';
import axios from 'axios';

export default function useCancelToken() {
  const cancelToken = useMemo(() => axios.CancelToken.source(), []);
  useEffect(() => {
    return () => cancelToken.cancel();
  }, [cancelToken]);
  return cancelToken.token;
}
