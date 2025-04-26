import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveTalksActionCreator } from '../talks/action';
import { receiveUsersActionCreator } from '../users/action';

export const asyncPopulateUsersAndTalks = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const talks = await api.getAllTalks();
      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveTalksActionCreator(talks));
    } catch (err) {
      alert(err.message);
    }
    dispatch(hideLoading());
  };
};
