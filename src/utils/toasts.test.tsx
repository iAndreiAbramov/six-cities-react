import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { render, screen } from '@testing-library/react';
import { mockRootStore } from 'test-mocks/mock-stores';

import { App } from 'components/App';

import { notifyError, notifyInfo, notifySuccess } from './toasts';

describe('toast functions', () => {
    const MESSAGE = 'Message';

    it('notifyError function should render message', async () => {
        render(
            <Provider store={mockRootStore}>
                <ToastContainer />
                <App />
            </Provider>,
        );

        notifyError(MESSAGE);

        const message = await screen.findByText(MESSAGE);
        expect(message).toBeInTheDocument();
    });

    it('notifySuccess function should render message', async () => {
        render(
            <Provider store={mockRootStore}>
                <ToastContainer />
                <App />
            </Provider>,
        );

        notifySuccess(MESSAGE);

        const message = await screen.findByText(MESSAGE);
        expect(message).toBeInTheDocument();
    });

    it('notifyInfo function should render message', async () => {
        render(
            <Provider store={mockRootStore}>
                <ToastContainer />
                <App />
            </Provider>,
        );

        notifyInfo(MESSAGE);

        const message = await screen.findByText(MESSAGE);
        expect(message).toBeInTheDocument();
    });
});
