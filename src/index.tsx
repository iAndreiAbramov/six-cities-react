import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from 'redux';

import { App } from './components/App';
import { RootReducerTypes, store } from './store/store';
import { requestLoginCheckThunkAction } from './store/thunk-actions/login-thunk-actions';
import reportWebVitals from './reportWebVitals';

void (store.dispatch as ThunkDispatch<RootReducerTypes, unknown, Action>)(
    requestLoginCheckThunkAction(),
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
