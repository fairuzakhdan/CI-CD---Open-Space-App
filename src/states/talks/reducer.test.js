import { it, describe, expect } from 'vitest';
import { talksReducer } from './reducer';

describe('talkReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = talksReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return the talks when given by RECEIVE_TALKS action', () => {
    const initialState = [];
    const action = {
      type: 'RECEIVE_TALKS',
      payload: {
        talks: [
          {
            id: 'talk-1',
            text: 'Talk Test 1',
            user: 'user-1',
            replyTo: '',
            likes: [],
            createdAt: '2022-09-22T10:06:55.588Z',
          },
          {
            id: 'talk-2',
            text: 'Talk Test 2',
            user: 'user-2',
            replyTo: '',
            likes: [],
            createdAt: '2022-09-22T10:06:55.588Z',
          },
        ],
      },
    };
    const nextState = talksReducer(initialState, action);
    expect(nextState).toEqual(action.payload.talks);
  });

  it('should return the talks with the new talk when given by ADD_TALK action', () => {
    const initialState = [
      {
        id: 'talk-2',
        text: 'Talk Test 2',
        user: 'user-2',
        replyTo: '',
        likes: [],
        createdAt: '2022-09-22T10:06:56.588Z',
      },
    ];
    const action = {
      type: 'ADD_TALK',
      payload: {
        talk: {
          id: 'talk-2',
          text: 'Talk Test 2',
          user: 'user-2',
          replyTo: '',
          likes: [],
          createdAt: '2022-09-22T10:06:56.588Z',
        },
      },
    };
    const nextState = talksReducer(initialState, action);
    expect(nextState).toEqual([...initialState, action.payload.talk]);
  });

  it('should return the talks with the toggled like talk when given by TOGGLE_LIKE_TALK action', () => {
    const initialState = [
      {
        id: 'talk-1',
        text: 'Talk Test 1',
        user: 'user-1',
        replyTo: '',
        likes: [],
        createdAt: '2022-09-22T10:06:55.588Z',
      },
    ];
    const action = {
      type: 'TOGGLE_LIKE_TALK',
      payload: {
        userId: 'user-1',
        talkId: 'talk-1',
      },
    };
    const nextState = talksReducer(initialState, action);
    expect(nextState).toEqual([
      {
        ...initialState[0],
        likes: [action.payload.userId],
      },
    ]);
    // unlike talk
    const nextState2 = talksReducer(nextState, action);
    expect(nextState2).toEqual(initialState);
  });
});
