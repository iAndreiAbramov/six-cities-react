import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FetchStatus } from 'constants/FetchStatus';

import { ReviewForm } from './ReviewForm';

describe('ReviewForm', () => {
    const handleFormSubmit = jest.fn((values) => alert(values));
    const COMMENT_LONG = 'comment with length more than 50 characters, and a few more letters...';

    it('should render correctly', () => {
        render(
            <ReviewForm
                handleFormSubmit={(values) => handleFormSubmit(values)}
                commentPostStatus={FetchStatus.Initial}
            />,
        );

        expect(screen.getAllByRole('radio')).toHaveLength(5);
        expect(screen.getByRole('textbox')).toHaveAttribute('name', 'comment');
        expect(screen.getByRole('button', { name: /submit/i }));
    });

    it('should update values and call a callback', () => {
        render(
            <ReviewForm
                handleFormSubmit={(values) => handleFormSubmit(values)}
                commentPostStatus={FetchStatus.Initial}
            />,
        );

        const radioButtons = screen.getAllByRole('radio');
        const textArea = screen.getByRole('textbox');
        const button = screen.getByRole('button', { name: /submit/i });

        userEvent.click(button);
        expect(handleFormSubmit).toHaveBeenCalledTimes(0);

        userEvent.click(radioButtons[2]);
        userEvent.type(textArea, COMMENT_LONG);

        expect(textArea).toHaveValue(COMMENT_LONG);

        userEvent.click(button);
        expect(handleFormSubmit).toHaveBeenCalledTimes(1);
        expect(handleFormSubmit).toHaveBeenCalledWith({ rating: '3', comment: COMMENT_LONG });
    });
});
