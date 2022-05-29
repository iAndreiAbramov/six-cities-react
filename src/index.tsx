import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from 'redux';

import { App } from './components/App';
import { RootReducerTypes, store } from './store/store';
import { requestLoginCheckThunkAction } from './store/thunk-actions/login-thunk-actions';
import reportWebVitals from './reportWebVitals';

import 'leaflet/dist/leaflet.css';

void (store.dispatch as ThunkDispatch<RootReducerTypes, unknown, Action>)(
    requestLoginCheckThunkAction(),
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
