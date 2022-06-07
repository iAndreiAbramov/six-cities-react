import { createSelector } from '@reduxjs/toolkit';
import { IUserReducer } from 'store/reducers/userReducer';
import { RootReducerTypes } from 'store/store';

const getUserState = (state: RootReducerTypes): IUserReducer => state.user;

export const selectUserEmail = createSelector([getUserState], (user) => user.data?.email);
export const selectIsNotSignedIn = createSelector([getUserState], (user) => !user.data?.email);
export const selectUserAvatar = createSelector([getUserState], (user) => user.data?.avatarUrl);
export const selectUserError = createSelector([getUserState], (user) => user.error);
