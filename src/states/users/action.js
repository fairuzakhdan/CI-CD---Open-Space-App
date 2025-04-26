import api from "../../utils/api";
export const ActionType = {
  RECEIVE_USERS: "RECEIVE_USERS",
};

export const receiveUsersActionCreator = (users) => {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
};

export const asyncRegisterUser = ({ id, name, password }) => {
  return async () => {
    try {
      await api.register({ id, name, password });
    } catch (err) {
      alert(err.message);
    }
  };
};
