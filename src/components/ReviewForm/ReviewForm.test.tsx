import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorMessage } from 'constants/ErrorMessage';
import { FetchStatus } from 'constants/FetchStatus';

import { ReviewForm } from './ReviewForm';

describe('ReviewForm', () => {
    const handleFormSubmit = jest.fn((values) => alert(values));
    const COMMENT_CORRECT =
        'comment with length more than 50 characters, and a few more letters...';
    const COMMENT_TOO_SHORT = 'comment with length less than 50 characters';
    const COMMENT_TOO_LONG =
        'comment with length more than 300 characters:' +
        ' wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww';

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

        const form = screen.getByTestId('review-form');
        const radioButtons = screen.getAllByRole('radio');
        const textArea = screen.getByRole('textbox');
        const button = screen.getByRole('button', { name: /submit/i });

        userEvent.click(button);
        expect(handleFormSubmit).toHaveBeenCalledTimes(0);
        expect(button).toBeDisabled();
        expect(form).toHaveClass('shake');

        userEvent.click(radioButtons[2]);
        userEvent.type(textArea, COMMENT_TOO_SHORT);
        expect(button).toBeDisabled();

        userEvent.type(textArea, COMMENT_TOO_LONG);
        expect(button).toBeDisabled();

        userEvent.type(textArea, COMMENT_CORRECT);
        expect(button).toBeEnabled();

        userEvent.click(button);
        expect(handleFormSubmit).toHaveBeenCalledTimes(1);
        expect(handleFormSubmit).toHaveBeenCalledWith({ rating: '3', comment: COMMENT_CORRECT });
    });

    it('should render a correct error message', () => {
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
        expect(screen.getByText(ErrorMessage.RatingRequired)).toBeInTheDocument();

        userEvent.click(radioButtons[2]);
        expect(screen.getByText(ErrorMessage.MinCommentLength)).toBeInTheDocument();

        userEvent.type(textArea, COMMENT_TOO_SHORT);
        expect(screen.getByText(ErrorMessage.MinCommentLength)).toBeInTheDocument();

        userEvent.type(textArea, COMMENT_TOO_LONG);
        expect(screen.getByText(ErrorMessage.MaxCommentLength)).toBeInTheDocument();

        userEvent.clear(textArea);
        userEvent.type(textArea, COMMENT_CORRECT);
        expect(screen.queryByText(ErrorMessage.MinCommentLength)).not.toBeInTheDocument();
        expect(screen.queryByText(ErrorMessage.MaxCommentLength)).not.toBeInTheDocument();
        expect(screen.queryByText(ErrorMessage.RatingRequired)).not.toBeInTheDocument();
    });
});
