import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  RECEIVE_TALKS: 'RECEIVE_TALKS',
  ADD_TALK: 'ADD_TALK',
  TOGGLE_LIKE_TALK: 'TOGGLE_LIKE_TALK',
};

export const receiveTalksActionCreator = (talks) => {
  return {
    type: ActionType.RECEIVE_TALKS,
    payload: {
      talks,
    },
  };
};

export const addTalkActionCreator = (talk) => {
  return {
    type: ActionType.ADD_TALK,
    payload: {
      talk,
    },
  };
};

export const toggleLikeTalkActionCreator = ({ userId, talkId }) => {
  return {
    type: ActionType.TOGGLE_LIKE_TALK,
    payload: {
      userId,
      talkId,
    },
  };
};

export const asyncAddTalk = ({ text, replyTo = '' }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const talk = await api.createTalk({ text, replyTo });
      dispatch(addTalkActionCreator(talk));
    } catch (err) {
      alert(err.message);
    }
    dispatch(hideLoading());
  };
};

export const asyncToogleLikeTalk = (talkId) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(toggleLikeTalkActionCreator({ userId: authUser.id, talkId }));
    try {
      await api.toggleLikeTalk(talkId);
    } catch (err) {
      alert(err.message);
      dispatch(toggleLikeTalkActionCreator({ userId: authUser.id, talkId }));
    }
    dispatch(hideLoading());
  };
};
