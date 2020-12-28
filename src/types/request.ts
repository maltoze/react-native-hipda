export enum RequestActionTypes {
  REQUEST__SENT = 'REQUEST__SENT',
  REQUEST__FULFILLED = 'REQUEST__FULFILLED',
  REQUEST__REJECTED = 'REQUEST__REJECTED',
}

export type RequestState<T = any> = {
  data: T;
  isLoading: boolean;
  error: string | null | undefined;
};

export type RequestAction = {
  type: RequestActionTypes;
  payload?: Partial<RequestState>;
};
