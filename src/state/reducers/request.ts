import {
  RequestAction,
  RequestActionTypes,
  RequestState,
} from '../../types/request';

export const requestInitialState = {
  isLoading: true,
  data: null,
  error: null,
};

export const requestReducer = (state: RequestState, action: RequestAction) => {
  switch (action.type) {
    case RequestActionTypes.REQUEST__SENT:
      return { ...state, isLoading: true };
    case RequestActionTypes.REQUEST__FULFILLED:
      return { ...state, data: action.payload?.data, isLoading: false };
    case RequestActionTypes.REQUEST__REJECTED:
      return { ...state, error: action.payload?.error, isLoading: false };
    default:
      return state;
  }
};
