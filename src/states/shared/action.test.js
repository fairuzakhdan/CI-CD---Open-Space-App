import { beforeEach, describe, it, afterEach, vi, expect } from 'vitest';
import api from '../../utils/api';
import { asyncPopulateUsersAndTalks } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { receiveUsersActionCreator } from '../users/action';
import { receiveTalksActionCreator } from '../talks/action';

const fakeTalksResponse = [
  {
    id: 'talk-1',
    text: 'Talk Test 1',
    user: 'user-1',
    replyTo: '',
    likes: [],
    createdAt: '2022-09-22T10:06:55.588Z',
  },
];
const fakeUsersResponse = [
  {
    id: 'user-1',
    name: 'User Test 1',
    photo: 'https://generated-image-url.jpg',
  },
];
const fakeErrorResponse = new Error('Ups, something went wrong');
describe('asyncPopulateUsersAndTalks thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllTalks = api.getAllTalks;
  });
  afterEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllTalks = api.getAllTalks;
  });

  delete api._getAllUsers;
  delete api._getAllTalks;
  it('should dispatch action correctly when data fetching success', async () => {
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllTalks = () => Promise.resolve(fakeTalksResponse);

    const dispatch = vi.fn();

    await asyncPopulateUsersAndTalks()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(fakeUsersResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveTalksActionCreator(fakeTalksResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllTalks = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();
    await asyncPopulateUsersAndTalks()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
