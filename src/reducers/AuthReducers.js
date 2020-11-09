import {Auth} from '../actions/types';

const INITIAL_STATE = {
  loginUsername: '',
  loginPassword: '',
  user: null,
  modalVisible: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Auth.LOGIN_MODAL_POPUP:
      return {...state, modalVisible: true};
    case Auth.LOGIN_MODAL_HIDE:
      return {...state, modalVisible: false};
    case Auth.USERNAME_CHANGED:
      return {
        ...state,
        loginUsernameError: '',
        loginUsername: action.payload,
      };
    case Auth.PASSWORD_CHANGED:
      return {
        ...state,
        loginPasswordError: '',
        loginPassword: action.payload,
      };
    case Auth.LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case Auth.USER_LOADED:
      return {
        ...INITIAL_STATE,
        user: action.payload,
      };
    default:
      return {...state};
  }
};
