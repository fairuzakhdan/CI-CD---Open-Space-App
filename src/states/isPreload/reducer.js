import { ActionType } from './action';

export const isPreloadReducer = (isPreload = true, action = {}) => {
  switch (action.type) {
  case ActionType.SET_IS_PRELOAD:
    return action.payload.isPreload;
  default:
    return isPreload;
  }
};
