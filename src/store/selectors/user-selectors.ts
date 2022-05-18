import { createSelector } from '@reduxjs/toolkit';
import { IUserReducer } from 'store/reducers/userReducer';
import { RootReducerTypes } from 'store/store';

const getUserState = (state: RootReducerTypes): IUserReducer => state.user;

export const selectUserName = createSelector([getUserState], (user) => user.data.name);
export const selectUserError = createSelector([getUserState], (user) => user.error);
