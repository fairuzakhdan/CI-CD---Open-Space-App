import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

export const setAuthUserActionCreator = (authUser) => {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
};

export const unsetAuthUserActionCreator = () => {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
};

export const asyncSetAuthUser = ({ id, password }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ id, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (err) {
      alert(err.message);
    }
    dispatch(hideLoading());
  };
};

export const asyncUnsetAuthUser = () => {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
    dispatch(hideLoading());
  };
};
