import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { userReducer as user } from './reducers/userReducer';

const rootReducer = combineReducers({
    user,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootReducerTypes = ReturnType<typeof rootReducer>;
