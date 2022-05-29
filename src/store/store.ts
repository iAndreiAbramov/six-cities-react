import { useDispatch } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { hotelsReducer as hotels } from './reducers/hotelsReducer';
import { userReducer as user } from './reducers/userReducer';

const rootReducer = combineReducers({
    user,
    hotels,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootReducerTypes = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
