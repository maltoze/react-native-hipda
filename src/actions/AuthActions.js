import {Auth} from './types';
import {requestToLogin} from '../api/auth';
import Config from '../Config';
import {stSaveUser} from '../utils/storage';

export const loginModalPopup = () => ({type: Auth.LOGIN_MODAL_POPUP});
export const loginModalHide = () => ({type: Auth.LOGIN_MODAL_HIDE});

export const loginUsernameChanged = (text) => ({
  type: Auth.USERNAME_CHANGED,
  payload: text,
});
export const loginPasswordChanged = (text) => ({
  type: Auth.PASSWORD_CHANGED,
  payload: text,
});
export const loadUserIntoRedux = (user) => ({
  type: Auth.USER_LOADED,
  payload: user,
});

export const loginUser = ({username, password, showToast, onSuccess}) => async (
  dispatch,
) => {
  try {
    const {uid} = await requestToLogin(username, password);
    dispatch({
      type: Auth.LOGIN_USER_SUCCESS,
      payload: createUser({uid, username}),
    });
    onSuccess();
  } catch (error) {
    console.error(error);
  }
};

const createUser = ({uid, username}) => {
  const isGuest = !uid;
  const user = {isGuest, uid, username};
  Config.logGeneral && console.log('Creating user: ', user);
  stSaveUser(user);
  return user;
};
