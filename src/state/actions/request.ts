import { RequestActionTypes } from '../../types/request';

export const requestSent = () => ({ type: RequestActionTypes.REQUEST__SENT });

export const requestFulfilled = (data: any) => ({
  type: RequestActionTypes.REQUEST__FULFILLED,
  payload: { data },
});

export const requestRejected = () => ({
  type: RequestActionTypes.REQUEST__REJECTED,
});
